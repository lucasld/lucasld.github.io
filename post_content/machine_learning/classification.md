---
layout: post
title: Machine Learning - Classification
---
Classification is the assigning of a class to data based on their attributes. Attributes are represented by feature vector $$\vec{x}\in\Re^d$$. The output is either a natural number $$c(\vec{x}) \in C \subset N$$ assigned to the $$\vert C\vert$$ different classes or alternatively, there are $$\vert C\vert$$ real values functions $$c_1(\vec{x})....c_{\vert C\vert}(\vec{x})$$, each of which is the "confidence" that belongs to the class. The $$c_i$$ are called discriminant functions, The output is $$c(\vec{x}) = argmax_i c_i(\vec{x})$$, $$c(\vec{x}) \in C$$.


### Bayes classifier:
Classify an input $$\vec{x}$$ such that the *expected cost is minimized*! That is, choose output class $$c$$ such that $$P(x\vert\vec{x}) = N*P(\vec{x}\vert c) * P(c)$$ is maximized, where:
* $$P(\vec{x}\vert c)$$ is the probability that class $$c$$ has feaures $$\vec{x}$$
* $$P(c)$$ is the a priori probability of class $$c$$
* $$N$$ is the normalization factor

**Problems:**\
The probability densities $$P(\vec{x}\vert c)$$, and sometimes also $$P(c)$$, are not known explicitly but need to be estimated from the data.

Two strategies:
1. estimate  $$P(\vec{x}\vert c)$$ and - if necessar - $$P(c)$$ from the data, then apply original Bayes classifiert. May require a lot of effort and more information than necessary to obtain the classifiert (because a classifier needs information to derive decision boundaries, not necessarily the complete densities)
2. construct an approximation to the Bayes classifiert directly from the data


### Euclidean classifier
Discriminant is found from the centers of mass of the classes: $$R(\vec{x}) = \vec{w} * \vec{x}$$ with  $$\vec{w} = <\vec{x^+}> - <\vec{x^-}$$
* linear separatrix, explicit representation
* not local
* very fast "training"
* no parameters
* sensitive to far outliers


### Linear discriminant analysis
...


### Quadratic classifier
...


### Polynom classifier
...


### Nearest neighbor classifier
...


### Support vector machine
Support vector machine (SVM) is one of the most popular classifiers.

**Principile:**
1. SVM computes a hyperplace (linear seperatrix)
    * based on the examples (**support vectos**) close to the class boundary
    * such that the **margin** is maximized
    * **slack variables** allow to deal with outliers to avoid overfitting
2. to solve nonlinear problems, the **kernel trick** is used
    * project data into a space of higher dimension
    * for sufficently high dimension, every problem becomes (linearly) seperable by a hyperplane
    * the projection of this hyperplane of this hyperplane back to the original data space is a nonlinear speratrix

Binary classification:
The SCM represents a hyperplace $$\vec{w} * \vec{x} - b = 0$$ where $$\vec{w}$$ is the normal to the hyperplace and $$b/{\vert\vec{w}\vert}$$ is its offset from the origin. For a linealy seperable problem, the SVM selects $$\vec{w}$$ and $$b$$ such that the seperatrix is in the middle of the margin. An extension provides a way to deal with outliers that disturb linear separability.

To apply the SVM to not linearly seperable problems, map the data from the orginal input space ($$\vec{x}\in\Re^d$$) to a higher dimensional space $$H$$ where it becomes linearly seperable.\
The problem with this is:
* for more input dimensions, the mapping $$\Re^d \rightarrow H$$ using, e.g., polynomials becomes huge
* mapping causes high effort
Solution by the **kernel trick**:
* fortunately, the SVM procedure to find the optimal hyperplace within the margin only requires the inner product of vectors $$\vec{x_a} * \vec{x_b}$$, not the vectors themselves
* thus only the inner products need to be computed in $$H$$
* this can be done without actually computing the representation of $$\vec{x_a} * \vec{x_b}$$ in $$H$$
* instead, the inner product of $$\vec{x_a}$$ and $$\vec{x_b}$$ in $$H$$ can be computed directly in the original input space using a **kernel function** $$K$$ as $$K(\vec{x_a}, \vec{x_b})$$



### Random forests
Motivation:
- decision trees are easy to build and easy to use
- drawback: overfitting, often due to
    1. ill chosen examples (noise, outliers)
    2. ill chosen features (at least for some of the examples)
- idea: "average out" overfitting by
    1. a **"gag of trees" = "forest"** approach
    2. a **"bag of features"** approach
- averaging is over the models, not the data
- thus the variance of classification is reduced

A random forest is a collection of uncorrelated decision trees. We get different uncorrelated trees by creating random subsets of $$D$$. These may overlap. From subset $$D_0, D_1, ...$$ we create decision trees $$T_0, T_1, ...$$. The forest is **random** insofar as the training sets are random. Right now we are bagging trees but we would like to improve this by bagging the features.

**Classic way of building up decision tree:**
```python
A = the "best" decision feature for next node, chosen out of all features
assign A as decision attribute for node
for each value of A:
    create new descendant of node
sort training examples to leaf nodes
if training examples are perfectl classified:
    STOP
else:
    iterate over new leaf nodes
```
**Feature bagging:**
```python
A = the "best" decision feature for next node, chosen out of a random subset of all features
assign A as decision attribute for node
for each value of A:
    create new descendant of node
sort training examples to leaf nodes
if training examples are perfectl classified:
    STOP
else:
    iterate over new leaf nodes
```
THe main advanteage of feature bagging is that the influence of features with extreme predictive power is reduced.

**Application:**\
Each tree yields a classification for input $$\vec{x}$$, $$T_0(\vec{x}), T_1(\vec{x}), ...$$. The class the majority of trees votes for is the output of the forest!

**Properties:**
* very simple algorithm
* very small number of parameters
* both training and application are well suited for parallelization
* very popular for applications
* concerning performance, random forests are said to be the second best to deep learning


### Summary
- classification is one of the most important ML tasks
- classifierts differ with respect to many criteria, the most important of which is the shape, "flexibility" and representation of the separatices
- SVMs are popular classifierts, along with (deep) MLPs. Numerous implementations exist
- currently, deep learning approaches dominate competitions. In practice, Random Forests appear to be superior as they are simple and easy to use
- success of classification depends very much on the choice of suitable features from the problem. As a rule of thumb, features are more important than the classifier.