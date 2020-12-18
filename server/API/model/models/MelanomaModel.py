###############################################################################
# CONFIGURE PATH
###############################################################################

import os, sys
PATH = '/'.join(os.path.dirname(os.path.realpath(__file__)).split('\\')[:-1])
sys.path.append(PATH)

###############################################################################
# Imports 
###############################################################################
import os 

import time
import warnings
import math

import torch
import torch.nn as nn
import torchtoolbox.transform as transforms

from torch.utils.data import DataLoader

from torch.optim.lr_scheduler import ReduceLROnPlateau

from efficientnet_pytorch import EfficientNet

import pandas as pd
import numpy as np

from .MelanomaDataset import MelanomaDataset, AdvancedHairAugmentation, Microscope
from .Network import Net

from ..utils.utils import print_epoch, compute_metrics
from ..utils.utils import prep_dirs

# from utils.utils import print_epoch, compute_metrics
# from utils.utils import prep_dirs

###############################################################################
# Dataset and Augmentation Classes
###############################################################################

class MelanomaModel:

    def __init__(self, meta_features):
        self.set_data_paths('/'.join(os.path.dirname(os.path.realpath(__file__)).split('\\')[:-1]))
        self.set_meta_features(meta_features)

    def set_data_paths(self, root):
        self._data_path     = root + '/data'
        self._data_dir      = self._data_path + '/data'
        self._data_csv_path = self._data_path + '/data.csv'

    def set_meta_features(self, meta_features):
        if meta_features == None:
            self._meta_features = []
        elif meta_features.lower() != 'all':
            self._meta_features = meta_features
        else:
            self._meta_features = ['sex',
                                'age_approx',
                                'site_anterior torso',
                                'site_head/neck',
                                'site_lateral torso',
                                'site_lower extremity',
                                'site_oral/genital',
                                'site_palms/soles',
                                'site_posterior torso',
                                'site_torso',
                                'site_upper extremity',
                                'site_nan'
                                ]

    def get_meta_features(self):
        return self._meta_features

    def get_model_state_dict_path(self):
        if self._meta_features:
            path = self._data_path + '/models/' + 'model_meta(' + str(self._meta_features) + ')'
        else:
            path = self._data_path + '/models/' + 'model_no_meta'
        prep_dirs(path)
        return path

    def get_model(self):
        return Net(
            arch=EfficientNet.from_pretrained('efficientnet-b1'),
            n_meta_features = len(self.get_meta_features())
            )
        
    def get_transforms(self):
        train_transform = transforms.Compose([
            AdvancedHairAugmentation(hairs_folder=PATH+'/data/melanoma-hairs'),
            transforms.RandomResizedCrop(size=256, scale=(0.8, 1.0)),
            transforms.RandomHorizontalFlip(),
            transforms.RandomVerticalFlip(),
            Microscope(p=0.5),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],std=[0.229, 0.224, 0.225])
        ])
        test_transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],std=[0.229, 0.224, 0.225])
        ])
        return train_transform, test_transform
        
class MelanomaModelClassifier(MelanomaModel):

    def __init__(self, meta_features=None):
        super().__init__(meta_features)
        self._model = self.load_model()

    def classify(self, image, meta=None):
        """
        Clasify a single image
        """ 
        _, test_transforms = self.get_transforms()
        image = test_transforms(image).unsqueeze(0).float()
        meta  = torch.tensor(meta).unsqueeze(0).float() if meta else torch.tensor(np.empty(0)).unsqueeze(0)
        prediction = torch.sigmoid(self._model((image, meta))).view(-1)
        
        return prediction.item()
        
    def load_model(self):
        """
        Load the model for predictions
        """
        model = self.get_model()
        model.load_state_dict(torch.load(self.get_model_state_dict_path()))
        model.eval()
        return model

class MelanomaModelTrainer(MelanomaModel):

    def __init__(self, meta_features=None, debug=False):
        super().__init__(meta_features)
        self._debug = debug
        warnings.simplefilter('ignore')

    def get_device(self):
        return torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    def get_data_sample(self):
        sample, _, _ = self.get_train_val_test_data_csv()
        return sample[:50]

    def get_train_val_test_data_csv(self):
        data = pd.read_csv(self._data_csv_path)
        data = data[:] if self._debug else data
        dummies = pd.get_dummies(data, dummy_na=True, dtype=np.uint8, prefix='site')
        
        # Sex features
        data['sex'] = data['sex'].map({'male': 1, 'female': 0})
        data['sex'] = data['sex'].fillna(-1)

        # Age features
        data['age_approx'] /= data['age_approx'].max()
        data['age_approx'] = data['age_approx'].fillna(0)
        
        # Fill Patient Ids
        data['patient_id'] = data['patient_id'].fillna(0)

        # Split data
        train = data.sample(frac=.8)
        other = data[~data.index.isin(train.index.values)]
        val   = other.sample(frac=.1)
        test  = other[~other.index.isin(val.index.values)]

        # Reset index values 
        train.index = np.arange(0, len(train))
        val.index = np.arange(0, len(val))
        test.index = np.arange(0, len(test))

        # Set data
        return train, val, test

    def get_data_loaders(self):
        train, val, test = self.get_train_val_test_data_csv()
        train_transforms, test_transforms = self.get_transforms()
        train_set = MelanomaDataset(df=train.reset_index(drop=True),
                                    imfolder=self._data_dir,
                                    train=True,
                                    transforms=train_transforms,
                                    meta_features=self.get_meta_features())
        val_set = MelanomaDataset(df=val.reset_index(drop=True),
                                  imfolder=self._data_dir,
                                  train=False,
                                  transforms=test_transforms,
                                  meta_features=self.get_meta_features())
        test_set = MelanomaDataset(df=test.reset_index(drop=True),
                                   imfolder=self._data_dir,
                                   train=False,
                                   transforms=test_transforms,
                                   meta_features=self.get_meta_features())
        train_loader = DataLoader(dataset=train_set, batch_size=32, shuffle=True, num_workers=2)
        val_loader   = DataLoader(dataset=val_set, batch_size=16, shuffle=False, num_workers=2)
        test_loader  = DataLoader(dataset=test_set, batch_size=16, shuffle=False, num_workers=2)
        return train_loader, val_loader, test_loader
                                
    def train(self, epochs=12, patience=3):
        """
        Train model
        """
        best_val = 0
        device = self.get_device()
        model = self.get_model().to(device)

        optim = torch.optim.Adam(model.parameters(), lr=0.001)
        scheduler = ReduceLROnPlateau(optimizer=optim, mode='max', patience=1, verbose=True, factor=0.2)
        criterion = nn.BCEWithLogitsLoss()
        

        train_loader, val_loader, test_loader = self.get_data_loaders()
        train_results, val_results, test_results = [], [], []
        
        # print(len(train_loader.dataset))
        # return
        for epoch in range(epochs):
            model.train()
            epoch_loss = 0
            loss, preds, labels = np.empty(0), np.empty(0), np.empty(0)
            for i, (x, y) in enumerate(train_loader):
                x[0] = torch.tensor(x[0], device=device, dtype=torch.float32)
                x[1] = torch.tensor(x[1], device=device, dtype=torch.float32)
                y = torch.tensor(y, device=device, dtype=torch.float32)
                optim.zero_grad()
                z = model(x)
                loss = criterion(z, y.unsqueeze(1))
                loss.backward()
                optim.step()
                
                preds  = np.concatenate((preds, torch.round(torch.sigmoid(z)).detach().cpu().view(-1)), axis=0)
                labels = np.concatenate((labels, y.cpu()), axis=0)

                epoch_loss += loss.item()
                print(f'Epoch: {epoch+1}\t| Batch: {i}/{len(train_loader)},  batch_loss: {loss.item():.6f}')

                del x, y, i
                torch.cuda.empty_cache()

            train_results.append((epoch_loss/len(train_loader), (labels, preds)))

            model.eval()
            with torch.no_grad():
                
                epoch_loss = 0
                loss, preds, labels = np.empty(0), np.empty(0), np.empty(0)
                for i, (x, y) in enumerate(val_loader):
                    x[0] = torch.tensor(x[0], device=device, dtype=torch.float32)
                    x[1] = torch.tensor(x[1], device=device, dtype=torch.float32)
                    y = torch.tensor(y, device=device, dtype=torch.float32)
                    z = model(x)
                    loss = criterion(z, y.unsqueeze(1))

                    preds  = np.concatenate((preds, torch.round(torch.sigmoid(z)).detach().cpu().view(-1)), axis=0)
                    labels = np.concatenate((labels, y.cpu()), axis=0)

                    del x, y, i
                    torch.cuda.empty_cache()

                val_results.append(((epoch_loss/len(val_loader), (labels, preds))))
                
                epoch_loss = 0
                loss, preds, labels = np.empty(0), np.empty(0), np.empty(0)
                for i, (x, y) in enumerate(test_loader):
                    x[0] = torch.tensor(x[0], device=device, dtype=torch.float32)
                    x[1] = torch.tensor(x[1], device=device, dtype=torch.float32)
                    y = torch.tensor(y, device=device, dtype=torch.float32)
                    z = model(x)
                    loss = criterion(z, y.unsqueeze(1))
                    
                    preds  = np.concatenate((preds, torch.round(torch.sigmoid(z)).detach().cpu().view(-1)), axis=0)
                    labels = np.concatenate((labels, y.cpu()), axis=0)

                    del x, y, i
                    torch.cuda.empty_cache()

                test_results.append(((epoch_loss/len(test_loader), (labels, preds))))

            print(print_epoch(epoch+1, epochs, train_results[-1], val_results[-1], test_results[-1]))

            val_roc = compute_metrics(*val_results[-1][1])['roc_auc']
            
            if val_roc >= best_val:
                best_val = val_roc
                patience = patience
                torch.save(model.state_dict(), self.get_model_state_dict_path())
            else:
                patience -= 1
                if patience == 0:
                    print('Early stopping. Best Val roc_auc: {:.3f}'.format(best_val))
                    break