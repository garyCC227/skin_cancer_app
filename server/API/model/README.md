# data folder

**_The content is excluded from git._**

The soruce directory for storing data
https://www.kaggle.com/nroman/melanoma-external-malignant-256

# Data directory must be configured as follows:

# data/data -> contains all images
# data/data.csv -> is the train_concat file downloaded from Kaggle
# data/melanome-hairs -> contains images of hairs from Kaggle

# MelanomaModelTrainer 
Class for training model 
Takes debug argument to limit size for testing 
Saves model 

# MelanomaModelClassifier 
Class for classifying individual images 