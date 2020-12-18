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

from models.MelanomaDataset import MelanomaDataset, AdvancedHairAugmentation, Microscope
from models.Network import Net

from utils.utils import print_epoch, compute_metrics    
from utils.utils import prep_dirs


class MelanomaModelClassifier(MelanomaModel):

    def __init__(self, meta_features=None):
        super().__init__(meta_features)
        self._model = self.load_model()

    def get_transforms(self):
        train_transform = transforms.Compose([
            AdvancedHairAugmentation(hairs_folder='./melanoma-hairs'),
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