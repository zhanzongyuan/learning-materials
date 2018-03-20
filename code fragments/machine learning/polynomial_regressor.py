# coding=utf-8
import pandas as pd
import sklearn.preprocessing as preprocessing
import matplotlib.pyplot as plt 
import numpy as np 
import sklearn.linear_model as linear_model

def importData(path):
    data = pd.read_table(path, header=None, delim_whitespace=True).as_matrix()
    return data

def regressor():
    data = importData('/Users/applecz/Documents/Data Science/ML/data.txt')
    num_train = int(0.8*len(data))
    data_train = data[0:num_train]
    X_train = np.array(data_train[:, 0].reshape(len(data_train), 1))
    Y_train = np.array(data_train[:, 1].reshape(len(data_train), 1))

    data_test = data[num_train:len(data)]
    X_test = np.array(data_test[:, 0].reshape(len(data_test), 1))
    Y_test = np.array(data_test[:, 1].reshape(len(data_test), 1))


    polynomial_fit = preprocessing.PolynomialFeatures(degree=3)
    X_train_transfromed = polynomial_fit.fit(X_train).transform(X_train)
    regressor = linear_model.LinearRegression()
    regressor.fit(X_train_transfromed, Y_train)
    y_train_pred = regressor.predict(X_train_transfromed)

    x_axis = np.linspace(min(X_train), max(X_train), num=50)
    x_axis_transformed = polynomial_fit.transform(x_axis.reshape(len(x_axis), 1))
    y_axis = regressor.predict(x_axis_transformed)
    plt.figure()
    plt.scatter(X_train, Y_train, color='blue')
    plt.plot(x_axis, y_axis, color='red')
    plt.show()

regressor()
