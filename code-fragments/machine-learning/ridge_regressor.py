# coding=utf-8
import pandas as pd
import numpy as np
import sklearn.linear_model as linear_model
import sklearn.metrics as metrics
import matplotlib.pyplot as plt

def importData(path):
    dataFrame = pd.read_table(path, delim_whitespace=True, header=None).as_matrix()
    print(dataFrame)
    return dataFrame

def regressor():
    data = importData('/Users/applecz/Documents/Data Science/ML/data.txt')
    num_train = int(0.8*len(data))
    data_train = data[0:num_train]
    X_train = np.array(data_train[:, 0].reshape(len(data_train), 1))
    Y_train = np.array(data_train[:, 1].reshape(len(data_train), 1))

    data_test = data[num_train:len(data)]
    X_test = np.array(data_test[:, 0].reshape(len(data_test), 1))
    Y_test = np.array(data_test[:, 1].reshape(len(data_test), 1))

    regressor = linear_model.Ridge(alpha=0.01, fit_intercept=True, max_iter=10000)
    regressor.fit(X_train, Y_train)

    y_train_pred = regressor.predict(X_train)
    plt.figure()
    plt.scatter(X_train, Y_train, color='blue')
    plt.plot(X_train, y_train_pred, color='red')
    plt.title('Training data')
    plt.show() 

    # Use test data judge our model.
    y_test_pred = regressor.predict(X_test)
    print ('Mean absolute error(平均绝对误差) =', round(metrics.mean_absolute_error(Y_test, y_test_pred), 2))
    print ('Mean squared error(均方误差) =', round(metrics.mean_squared_error(Y_test, y_test_pred), 2))
    print ('Median absolute error(中值绝对误差) =', round(metrics.median_absolute_error(Y_test, y_test_pred), 2))  
    print ('Explained variance score(解释方差分数) =', round(metrics.explained_variance_score(Y_test, y_test_pred), 2))
    print ('R2 score =', round(metrics.r2_score(Y_test, y_test_pred), 2))




regressor()