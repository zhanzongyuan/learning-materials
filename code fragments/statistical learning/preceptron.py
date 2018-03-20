#config=utf-8
import numpy as np
import random
import matplotlib.pyplot as plt
class preceptron:
    def __init__(self):
        # Initial learning rate for stochastic gradient descend.
        self.__learningrate__ = 1
        # Initial w and b.
        self.w = [random.random(), random.random()]
        self.b = random.random()

    def set_learningrate(self, r):
        # Set learning rate.
        self.__learningrate__ = r
    
    def feed_trainingdata(self, X, Y):
        # Feed traning data to senor.
        self.X = X
        self.Y = Y
        self.num = len(Y)

    def __loss__(self):
        # Compute loss of w and b. 
        self.__D__ = np.ones(self.num)
        
        M = []
        for i in range(self.num):
            self.__D__[i] = -self.Y[i]*(np.matmul(self.w, self.X[i].T)+self.b)
            if self.__D__[i] < 0:
                self.__D__[i] = 0
            else:
                M.append(i)
                random.shuffle(M)

        
        self.__randomnum__ = -1

        crate = 1-len(M)/self.num
        print('correct rate = %f\n' % crate)
        if len(M) > 0:
            self.__randomnum__ = M[0]
            # !!!Here must consider the situation that the result is zero.
            return np.sum(self.__D__)+1
        
        return -1
    
    def __gradientpace__(self, x, y):
        print(x, y)
        # Find gradient path of wrong x_i and y_i
        return -x*y*self.__learningrate__, -y*self.__learningrate__

    
    def train(self):
        plt.ion() 
        yp = (Y==1)
        yn = (Y==-1)
        
        # Train to find best w and b.
        for i in range(1000):
            print('w = %s, b = %s, ' % (self.w, self.b), end='')

            plt.cla()
            plt.scatter(self.X[:, 0][yp], self.X[:, 1][yp], color='red')
            plt.scatter(self.X[:, 0][yn], self.X[:, 1][yn], color='blue')
            # xline = np.linspace(self.X.min(axis=0)[0], self.X.max(axis=0)[0], 2)
            xline = np.linspace(-2, 10, 2)
            yline = -(xline*self.w[0]+self.b)/self.w[1]
            plt.plot(xline, yline, linewidth=2)
            plt.axis([-2, 10, -2, 10])
            plt.pause(0.1)

            # Compute loss and if loss then update w, b
            if self.__loss__() > 0:
                pacew, paceb = \
                self.__gradientpace__(self.X[self.__randomnum__], self.Y[self.__randomnum__])
                print(pacew, paceb)
                self.w = self.w-pacew
                self.b = self.b-paceb
            else:
                break
        plt.ioff()
        

X = np.array([[0, 1], [0, 2], [0, 3], [0, 0], [2, 0], [3, 2], [4, 4]])
Y = np.array([1, 1, 1, -1, -1, -1, 1])
s = preceptron()
s.feed_trainingdata(X, Y)
s.set_learningrate(0.05)
s.train()



        
    
