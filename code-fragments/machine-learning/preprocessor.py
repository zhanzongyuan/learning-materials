#coding=utf-8
# This is the script to learn how to preprocess data.
import numpy as np
from sklearn import preprocessing

data = np.array([[1, 2, 3], [3, 6, 4], [3, 3, 1]])
def preprocessor():
    # mean removal
    # 标准化 均值为0 方差为1
    data_standardized = preprocessing.scale(data)
    print(data_standardized, "\n")

    # Scaling
    # Must fit data first.
    data_scaler = preprocessing.MinMaxScaler(copy=True, feature_range=(0, 1))
    data_scaled = data_scaler.fit(data).transform(data)
    print(data_scaled, "\n")

    # Normalization
    # 正则化 总和为一
    data_normalized = preprocessing.normalize(data, norm='l1')
    print(data_normalized, "\n")

    # Binarization
    data_binarized = preprocessing.Binarizer(threshold=3.5).transform(data)
    print(data_binarized, "\n")

    # One Hot Encoding
    # fit三个样本，每个样本三个特征
    # 第一个特征4种，实际只算1, 3，(0: 00, 1: 10, 2: 00, 3: 01)
    # 第二个特征7种，...
    # 第三个特征5种，...
    print(data)
    ecr = preprocessing.OneHotEncoder(sparse=False)
    ecr.fit(data)
    print(ecr.n_values_)
    print(ecr.transform([[0, 0, 1]]))
    print(ecr.transform([[0, 6, 0]]))
    print(ecr.transform([[1, 0, 0]]))
    print(ecr.transform(data))

preprocessor()