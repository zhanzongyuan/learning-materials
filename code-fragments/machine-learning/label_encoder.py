# coding=utf-8
import sklearn.preprocessing as preprocessing

data = ['dhh', 'lky', 'zzy', 'lyh', 'wrf', 'cpc', 'pjt']
def label_encoder():
    label_encoder = preprocessing.LabelEncoder()
    label_encoder.fit(data)
    print(label_encoder.classes_)
    print(label_encoder.transform(['dhh', 'cpc']))
    print(label_encoder.transform(data))


label_encoder()