###############################################################################
# Imports 
###############################################################################

import torch.nn as nn

###############################################################################
# Network
###############################################################################
class Net(nn.Module):
    def __init__(self, arch, n_meta_features=None):
        super(Net, self).__init__()
        self.arch = arch
        self.n_meta_features = n_meta_features
        if 'ResNet' in str(arch.__class__):
            self.arch.fc = nn.Linear(in_features=512, out_features=500, bias=True)
        if 'EfficientNet' in str(arch.__class__):
            self.arch._fc = nn.Linear(in_features=1280, out_features=500, bias=True)
        if n_meta_features:
            self.meta = nn.Sequential(nn.Linear(n_meta_features, 500),
                                    nn.BatchNorm1d(500),
                                    nn.ReLU(),
                                    nn.Dropout(p=0.2),
                                    nn.Linear(500, 250),  # FC layer output will have 250 features
                                    nn.BatchNorm1d(250),
                                    nn.ReLU(),
                                    nn.Dropout(p=0.2))
            self.ouput = nn.Linear(500 + 250, 1)
        else:
            self.ouput = nn.Linear(500, 1)
        
    def forward(self, inputs):
        """
        No sigmoid in forward because we are going to use BCEWithLogitsLoss
        Which applies sigmoid for us when calculating a loss
        """
        x, meta = inputs
        features = self.arch(x)
        if self.n_meta_features:
            meta_features = self.meta(meta)
            features = torch.cat((cnn_features, meta_features), dim=1)
        return self.ouput(features)