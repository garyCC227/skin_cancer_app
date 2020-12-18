###############################################################################
# Imports 
###############################################################################
import random, os, torch, numpy, math
from sklearn.metrics import confusion_matrix, roc_auc_score

###############################################################################
# UTILITY FUNCTIONS
###############################################################################
def prep_dirs(fpath):
    dpath = '/'.join(fpath.split('/')[:-1])
    os.makedirs(dpath) if not os.path.isdir(dpath) else None

def seed_everything(seed):
    random.seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    numpy.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = True

def compute_metrics(predictions, labels):
    tn, fp, fn, tp = confusion_matrix(labels, predictions, labels=[0,1]).ravel()
    acc = 0 if (tp+int(fp)+int(tn)+fn) == 0 else (tp + tn)/(tp+int(fp)+int(tn)+fn)
    mcc = 0 if (tp+fp)*(int(tp)+int(fn))*(tn+fp)*(tn+fn) == 0 else (tp*tn-fp*fn)/math.sqrt((tp+fp)*(int(tp)+int(fn))*(tn+fp)*(tn+fn))
    f1, prec, rec = 0, 0, 0
    if (int(tp)+int(fn))*(tp+fp) == 0:
        prec, rec, f1 = 0, 0, 0
    else:
        prec, rec = tp/(tp+fp), tp/(int(tp)+int(fn))
        f1 = 0 if (prec+rec) == 0 else 2*(prec*rec)/(prec+rec)
    return {
        'accuracy': acc, 
        'mcc': mcc, 
        'f1': f1,
        'precision': prec,
        'recall': rec,
        'roc_auc': 0#roc_auc_score(labels, predictions)
    }

def print_epoch(epoch, epochs, train, val=None, test=None):
    epoch_string = '----------------------------------------------------------------------------------------------------\n'
    epoch_num = f'Epoch {epoch}/{epochs}:  '
    start_len = ''.join([' '*len(epoch_num)])
    if train and val and test:
        train_stats, val_stats, test_stats = compute_metrics(*train[1]), compute_metrics(*val[1]), compute_metrics(*test[1])
        epoch_string += f'{epoch_num}Train loss: {train[0]:.5f}  Val loss: {val[0]:.5f}  Test loss: {test[0]:.5f}\n'
        epoch_string += '{}Train acc:  {:.5f}  Val acc:  {:.5f}  Test acc:  {:.5f}\n'.format(start_len, train_stats['accuracy'], val_stats['accuracy'], test_stats['accuracy'])
        epoch_string += '{}Train roc:  {:.5f}  Val roc:  {:.5f}  Test roc:  {:.5f}\n'.format(start_len, train_stats['roc_auc'], val_stats['roc_auc'], test_stats['roc_auc'])
        epoch_string += '{}Train mcc:  {:.5f}  Val mcc:  {:.5f}  Test mcc:  {:.5f}\n'.format(start_len, train_stats['mcc'], val_stats['mcc'], test_stats['mcc'])
        epoch_string += '{}Train f1:   {:.5f}  Val f1:   {:.5f}  Test f1:   {:.5f}\n'.format(start_len, train_stats['f1'], val_stats['f1'], test_stats['f1'])
        epoch_string += '{}Train prec: {:.5f}  Val prec: {:.5f}  Test prec: {:.5f}\n'.format(start_len, train_stats['precision'], val_stats['precision'], test_stats['precision'])
        epoch_string += '{}Train rec:  {:.5f}  Val rec:  {:.5f}  Test rec:  {:.5f}\n'.format(start_len, train_stats['recall'], val_stats['recall'], test_stats['recall'])
    elif train and test:
        train_stats, test_stats = compute_metrics(*train[1]), compute_metrics(*test[1])
        epoch_string += f'{epoch_num}Train loss: {train[0]:.5f}  Test loss: {test[0]:.5f}\n'
        epoch_string += '{}Train acc:  {:.5f}  Test acc:  {:.5f}\n'.format(start_len, train_stats['accuracy'], test_stats['accuracy'])
        epoch_string += '{}Train roc:  {:.5f}  Test roc:  {:.5f}\n'.format(start_len, train_stats['roc_auc'], test_stats['roc_auc'])
        epoch_string += '{}Train mcc:  {:.5f}  Test mcc:  {:.5f}\n'.format(start_len, train_stats['mcc'], test_stats['mcc'])
        epoch_string += '{}Train f1:   {:.5f}  Test f1:   {:.5f}\n'.format(start_len, train_stats['f1'], test_stats['f1'])
        epoch_string += '{}Train prec: {:.5f}  Test prec: {:.5f}\n'.format(start_len, train_stats['precision'], test_stats['precision'])
        epoch_string += '{}Train rec:  {:.5f}  Test rec:  {:.5f}\n'.format(start_len, train_stats['recall'], test_stats['recall'])
    else: 
        train_stats = compute_metrics(*train[1])
        epoch_string += f'{epoch_num}Train loss: {train[0]:.5f}\n'
        epoch_string += '{}Train acc:  {:.5f}\n'.format(start_len, train_stats['accuracy'])
        epoch_string += '{}Train roc:  {:.5f}\n'.format(start_len, train_stats['roc_auc'])
        epoch_string += '{}Train mcc:  {:.5f}\n'.format(start_len, train_stats['mcc'])
        epoch_string += '{}Train f1:   {:.5f}\n'.format(start_len, train_stats['f1'])
        epoch_string += '{}Train prec: {:.5f}\n'.format(start_len, train_stats['precision'])
        epoch_string += '{}Train rec:  {:.5f}\n'.format(start_len, train_stats['recall'])
    tn, fp, fn, tp = [str(x).rjust(4, ' ') for x in confusion_matrix(*train[1], labels=[0,1]).ravel()]
    epoch_string += '\nTrain\t\t({} pos, {} neg): \ttp: {}, fp: {}, tn: {}, fn: {}\n'.format(int(tp)+int(fn), int(fp)+int(tn), tp, fp, tn, fn)
    if val:
        tn, fp, fn, tp = [str(x).rjust(4, ' ') for x in confusion_matrix(*val[1], labels=[0,1]).ravel()]
        epoch_string += 'Validation\t({} pos, {} neg): \ttp: {}, fp: {}, tn: {}, fn: {}\n'.format(int(tp)+int(fn), int(fp)+int(tn), tp, fp, tn, fn)
    if test:
        tn, fp, fn, tp = [str(x).rjust(4, ' ') for x in confusion_matrix(*test[1], labels=[0,1]).ravel()]
        epoch_string += 'Test\t\t({} pos, {} neg): \tp: {}, fp: {}, tn: {}, fn: {}\n'.format(int(tp)+int(fn), int(fp)+int(tn), tp, fp, tn, fn)
    epoch_string += '----------------------------------------------------------------------------------------------------\n'
    return epoch_string