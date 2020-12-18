import cv2
from models.MelanomaModel import MelanomaModelTrainer, MelanomaModelClassifier
import os


model = MelanomaModelClassifier()

'''
----------------------------------------------------------------------------------------------------
Epoch 1/5:  Train loss: 0.14812  Val loss: 0.00000  Test loss: 0.00000
            Train acc:  0.95116  Val acc:  0.95750  Test acc:  0.95190
            Train roc:  0.00000  Val roc:  0.00000  Test roc:  0.00000
            Train mcc:  0.78595  Val mcc:  0.77920  Test mcc:  0.77804
            Train f1:   0.81283  Val f1:   0.77778  Test f1:   0.78238
            Train prec: 0.77656  Val prec: 0.63636  Test prec: 0.64751
            Train rec:  0.85264  Val rec:  1.00000  Test rec:  0.98820

Train           (4113 pos, 26005 neg):  tp: 3194, fp:  552, tn: 25453, fn:  919
Validation      (88 pos, 665 neg):      tp:   56, fp:    0, tn:  665, fn:   32
Test            (905 pos, 5872 neg):    p:  586, fp:    7, tn: 5865, fn:  319
----------------------------------------------------------------------------------------------------
Epoch 2/5:  Train loss: 0.11509  Val loss: 0.00000  Test loss: 0.00000
            Train acc:  0.96285  Val acc:  0.96813  Test acc:  0.96975
            Train roc:  0.00000  Val roc:  0.00000  Test roc:  0.00000
            Train mcc:  0.83625  Val mcc:  0.83782  Test mcc:  0.86408
            Train f1:   0.85515  Val f1:   0.84211  Test f1:   0.87431
            Train prec: 0.80306  Val prec: 0.72727  Test prec: 0.78785
            Train rec:  0.91445  Val rec:  1.00000  Test rec:  0.98209

Train           (4113 pos, 26005 neg):  tp: 3303, fp:  309, tn: 25696, fn:  810
Validation      (88 pos, 665 neg):      tp:   64, fp:    0, tn:  665, fn:   24
Test            (905 pos, 5872 neg):    p:  713, fp:   13, tn:  , fn:  192
----------------------------------------------------------------------------------------------------
Epoch 3/5:  Train loss: 0.10554  Val loss: 0.00000  Test loss: 0.00000
            Train acc:  0.96597  Val acc:  0.95618  Test acc:  0.95470
            Train roc:  0.00000  Val roc:  0.00000  Test roc:  0.00000
            Train mcc:  0.85079  Val mcc:  0.77165  Test mcc:  0.79243
            Train f1:   0.86861  Val f1:   0.76923  Test f1:   0.79574
            Train prec: 0.82373  Val prec: 0.62500  Test prec: 0.66077
            Train rec:  0.91866  Val rec:  1.00000  Test rec:  1.00000

Train           (4113 pos, 26005 neg):  tp: 3388, fp:  300, tn: 25705, fn:  725
Validation      (88 pos, 665 neg):      tp:   55, fp:    0, tn:  665, fn:   33
Test            (905 pos, 5872 neg):    p:  598, fp:    0, tn: 5872, fn:  307
----------------------------------------------------------------------------------------------------
Epoch 4/5:  Train loss: 0.10029  Val loss: 0.00000  Test loss: 0.00000
            Train acc:  0.96872  Val acc:  0.94555  Test acc:  0.93552
            Train roc:  0.00000  Val roc:  0.00000  Test roc:  0.00000
            Train mcc:  0.86282  Val mcc:  0.70928  Test mcc:  0.69376
            Train f1:   0.87870  Val f1:   0.69630  Test f1:   0.68172
            Train prec: 0.82956  Val prec: 0.53409  Test prec: 0.51713
            Train rec:  0.93403  Val rec:  1.00000  Test rec:  1.00000

Train           (4113 pos, 26005 neg):  tp: 3412, fp:  241, tn: 25764, fn:  701
Validation      (88 pos, 665 neg):      tp:   47, fp:    0, tn:  665, fn:   41
Test            (905 pos, 5872 neg):    p:  468, fp:    0, tn: 5872, fn:  437
----------------------------------------------------------------------------------------------------

Epoch 5/5:  Train loss: 0.09495  Val loss: 0.00000  Test loss: 0.00000
            Train acc:  0.96852  Val acc:  0.94688  Test acc:  0.93670
            Train roc:  0.00000  Val roc:  0.00000  Test roc:  0.00000
            Train mcc:  0.86198  Val mcc:  0.71610  Test mcc:  0.69855
            Train f1:   0.87806  Val f1:   0.71429  Test f1:   0.69810
            Train prec: 0.82981  Val prec: 0.56818  Test prec: 0.54807
            Train rec:  0.93226  Val rec:  0.96154  Test rec:  0.96124

Train           (4113 pos, 26005 neg):  tp: 3413, fp:  248, tn: 25757, fn:  700
Validation      (88 pos, 665 neg):      tp:   50, fp:    2, tn:  663, fn:   38
Test            (905 pos, 5872 neg):    p:  496, fp:   20, tn: 5852, fn:  409
----------------------------------------------------------------------------------------------------
'''

if __name__ == "__main__":
  # trainer = MelanomaModelTrainer(debug=True) # Set debug to restrict data size to 50 
  # trainer.train(epochs=5)
  
  model = MelanomaModelClassifier()

  PATH = '/'.join(os.path.dirname(os.path.realpath(__file__)).split('\\')[:-1])
  image = cv2.imread(f'{PATH}/model/data/data/ISIC_0946787.jpg')
  # print(PATH)
  # print(image.shape)

  print(model.classify(image))