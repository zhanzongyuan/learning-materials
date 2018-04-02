# Learning from digit recogizer

> 通过digit recogizer的使用对Tensorflow的基本认识

1. TensorFlow框架下的程序

我的理解：

- 和一般的顺序执行程序不同，TensorFlow程序的运行需要先确定一个数据计算的有向图，每个节点单元为一个计算节点，每条边确定节点之间的数据流向。其实另外一种理解就想是定义了一个函数，通过sess调用函数并且传参。
- 图中按照拓扑顺序定义节点之间的优先顺序，按照优先顺序的先后完成网络各个节点的计算和数据的传递。其中这种拓扑的好处就是，在相同优先级的节点处的计算可以通过并行计算减少运行时间，而且TensorFlow设计成Tensor为数据结构单元，目的是为了利用GPU可以对矩阵运算高效计算能力。
- 所以TensorFlow框架下的程序可以分为两部分：图的构建、运行图


<br>

2. Tensorflow框架

- TensorFlow是个框架工具，提供：
  - 数据结构：网络图中的操作数据单元
    - tensor（多维矩阵）
  - 变量类型：限定了变量的性质和方法
    - tf.constant 常量
    - tf.Variable 变量
  - 载入数据实例的方法
    - tf.placeholder
  - 基本数学算术方法
  - Neural Network相关方法（tf.nn.xxx)
    - 激活函数
    - 卷积
    - 池化
    - 正则化/归一化
    - 损失
    - 分类
    - ...


<br>
​      

3. Kaggle社区为digit recogizer提供了许多有用的参考，这次的digit recogizer如果没有社区中他人的kernel的学习资料的提供，可能没有那么快能够入手TensorFlow。下面我总结一下这次学习到的一些工具，不止是TensorFlow，由于自身python的新手，连numpy框架和pandas框架都要从头学



- tensorflow框架相关方法

`tf.one_hot`将一个样本标签，转变为0，1标签，如 `[ 3 ] => [ 0, 0, 1 ]`，`depth`表示得到的新标签的宽度，`axis`表示标签的形式，有[-1, 0, 1] 可选，具体查看相关文档

```python
one_hot_matrix = tf.one_hot(indices=label_set, depth=label_len, axis=0)
```

类似的非tensorflow方法有`convert_to_one_hot`

 ```python
 train_labels = convert_to_one_hot(train_labels, int(np.max(train_labels)+1))
 ```



`tf.nn.relu`线性整流函数，作为激励函数

```python
A2 = tf.nn.relu(Z2)
```

`tf.nn.softmax_cross_entropy_with_logits` 计算交叉熵

`tf.reduce_mean`计算代价，用于反馈回网络，使得调整参数

```python
tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits, labels=labels))
```



`tf.get_variable`获取一个tf变量，类似`tf.Variable`但是这里可以指定初始化器，如下面的例子第二个参数代表shape，第三个参数指定初始化器`tf.contrib.layers.xavier_initializer()` 

```python
W1 = tf.get_variable('W1', (n_1, n_in), initializer=tf.contrib.layers.xavier_initializer())
```

`tf.Variable, tf.place_holder, tf.constant` 表示tf中变量的形式，Variable是用于存中间变量的容器，place_holder在图运行时外界输入数据的填充处，类似传参，constant则是预先定义的常数



- pandas，numpy框架

> pandas和numpy框架主要在运行tensorflow图前用于数据文件的读入，预处理

`pd.read_csv`读入csv文件返回一个pandas的一个内部类，Dataframe，需要`as_matrix`转换为numpy对象

``` python
train_data = pd.read_csv(train_data_path).as_matrix() 
```



4. 后记

其实通过这次实际操作，只是对TensorFlow和python的框架有了基本的了解，并没有达到运用自如的情况，比如其中的很多数学函数，用于优化，计算代价等，这部分我觉得是困扰我最多的地方。许多需要使用的数学函数从未见过，后面我觉得要继续深入弄懂这些函数的使用方法，以及神经网络的设计过程中不同的函数的使用方式，同时还有结合更多编程实例。



