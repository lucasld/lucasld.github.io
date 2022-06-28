---
layout: post
title: Machine Learning - Clustering
---
Why would we want to cluster data? For one, clusters in some feature space may indicate closeness of data on a semantic level. Also, clusters allow us to compress data as it sufficies to only transmit cluster centers instead of the data belonging to the clusters.
### Distance measures
There are ceveral options to measure the distance between clusters. For clusters $$X$$ and $$Y$$ you might use:
* $$D_{min}(X, Y) = min_{\vec{x}\in X, \vec{y}\in Y}d(\vec{x}, \vec{y})$$ this is the mimimum difference
* $$D_{max}(X, Y) = max_{\vec{x}\in X, \vec{y}\in Y}d(\vec{x}, \vec{y})$$ this is the maximum difference
* $$D_{mean}(X, Y) = 1/{\vert X \vert \vert Y \vert}\sum{\vec{x}\in X, \vec{y}\in Y}d(\vec{x}, \vec{y})$$ mean of all distances
* $$D_{centroid}(X, Y) = d(1/{\vert X \vert} \sum_{\vec{x}\in X} \vec{x}, 1/{\vert Y \vert} \sum_{\vec{y}\in Y})$$ distance between cluster centers

Given a data distribution, it is not clear what clusters an algorithm should find. The definition of clusters depends on scale.


### Bias in clustering
All clustering algorithm have some kind of bias:
* a certain cluster model is prefered
* the model comprises scale and shape of clusters
* usually bias is an implicit part of the algorithm
* adjustable parameters are usually processing parameters (of the algorithm), not model parameters
* the conncetion between parameters and the implicit cluster model usually needs to be inferred from the way the algorithm is working
* hierarchical clustering solves the problem for the scale parameter insofar as all solutions on different scales are presented in an ordered way


### Hierarchical clustering
There are two complementary methods:
* Agglomerative clustering:
    - start with each data point as a cluster
    - **merge** clusters recursively top down
* Divisive clustering
    - start with all data points as a single cluster
    - **split** clusters recursively top down
The result is a dendrogram representing all data in a hierachy of clusters.

**Agglomorative clustering:**
```python
n = number of clusters
C = assign each of n data elements to a cluster C_i, i=1...n
while n>2:
    find the pair of clusters C_i and C_j, i < j that optimizes the linkage criterion
    merge C_i <- C_i unified C_j
    if j < n:
        C_j = C_n
    n -= 1
```

**Single linkage clustering** employs the minimum cluster distance.\
**Complete linkage clustering** employs the maximum cluster distance.\
Single linkage clustering tends to chaining and complete linkage clustering prefers compact clusters. We can also use **average linkage clustering** or *UPGMA* (Unweighted Pair Group Method with Arithmetic mean). In **centroid clustering** centroid distance is used. Here real valued attributes are required for the centroid computation. Also, when joining two clusters, the resulting centroid is dominated by the cluster with more members.

**Ward's minimum variance clustering:**\
Merge the pair of clusters for which the increase in total variance is mimized.\
$$E = \sum_i \sum_{\vec{x} \in C_i} (\vec{x} - \vec{\mu_i})^2$$\
$$\vec{\mu_i} = 1/{\vert C_i \vert} \sum_{\vec{x} \in C_i}\vec{x}$$\
In contrast to the previous approaches, this one is *optimization based*. It can also be implemented by a distance measure:\
$$D_{ward} = D_{centroid}(X, Y) / (1/{\vert X \vert} + 1/{\vert Y \vert})$$\
Propoerties:
- prefers spherical clusters and clusters of similar size
- robust against noise but not against outliers

**Properties of hierachical clustering**\
- any distance measure can be used
- we need only the distance matrix (not the data)
- no parameters
- efficency:
    * agglomerative: $$O(n^3)$$ in naive approach, $$O(n^2)$$ SLINK-algorithm
    * divisive: $$O(2^n)$$ in naive approach, $$O(n^2)$$ CLINK-algorithm
    * in general, efficeny can be increased by avoiding unnecessary re-computation of distances
- resulting dendrogram offers alternative clusterings
- dendrogram needs to analyzed
- cut off at different levels of dendrogram may be necessary to get comparable clusters
- outliers are fully incorporated


### Optimization based clustering
The idea of optimization based clustering is to maximize some kind "goodness function" which assigns a "goodness value" to any partioning of the data.

**Basic maximization algorithm:**
```python
C = somehow partition data into clusters C_1...C_n
while not stop_condition():
    choose an example datapoint x at random, denote its clister as C(x)
    select a random target cluster C_i
    ∆E = change of the goodness function = E(x in C_i) - E(x in C(x))
    if ∆E > 0:
        put x from C(x) to C_i
    else:
        put x from C(x) to C_i with probability exp(β∆E)
    increase β
```
- may be caught on local maxima
- dependence on intial partioning
- to escape local maxima, downhill steps are accepted with probability exp(β∆E)
- initially small β allows frequent downhill steps
- increasing β makes downhill steps less likely until the process "freezes" (simulated annealing)


### Compression by clustering
Given a data set $$D = \{ \vec{x_1}, \vec{x_2}, ...\}$$ of d-dimensional vectors $$\vec{x_i} \in \Re^d$$. The number of bits per data point depends on d and the required precision (and the statistics of the distribution). A cluster algorithm will yield a number $$K < |D|$$ of *cluster centers* $$\vec{w_j}\in\Re^d$$ (also called nodes, refrence vectors or codewords). A data vector $$\vec{x_i}$$ can now be approximated by its *best match* cluster center $$\vec{w_m}$$ where $$m(\vec{x_i}) = argmin_j \|\vec{x_i} - \vec{w_j}\|$$. This means that we have to transmit $${\vec{w_i}}$$ once and after that only the number of the best match cluster center.\
- small **K**: high compression ratio, bad approximation
- large **K**: low compression ration, good approximation


### K-means clustering
The term [K-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) was termed by James McQueen in 1967 though the idea goes back to Hugo Steinhause 1956.

The algorithm works by first dividing $$D$$ into clusters $$C_1 ... C_K$$ which are represented by their K centers of gravity (means) $$\vec{w_1} ... \vec{w_K}$$. The algorithm minimizes the qudratic error measure: $$E(D, \{ \vec{w_i}\}) = 1/{|D|} \sum_{i=1...|D|}\|\vec{x_i} - \vec{w_{m(\vec{x_i})}}\|^2$$.

Iterative K-means clustering:
1. start with randomly chosen reference vectors
2. assign all of the data to best match refrence vectors
3. update reference vectors by shifting them to the mean/center of their cluster
4. *stop* if cluster centers have moved no more than $$\epsilon$$, else goto 2

```python
D = data set
t = 0
create K reference vectors w chosen randomly within a suitable bounding box in 'R^d'
C = list to store clusters
while some w_k has moved more than epsilon:
    for k in range(1, K):
        add cluster container to C
    for x in D:
        k = cluster k with x has the smallest distance to (distance from x to w_k)
        add x to C[k]
    t += 1
    for k in range(1, K):
        w_k = mean of all points in C_k
```

The number of clusters K implicitly defines scale and resulting shape of the clusters. K-means optimizes greedily and therefore can end up in a local optima. The kind of optima we end up in depends on the intial condition (cluster centers).

#### K-means clustering for color compression
In a digital image colors can be represented as RGB-colors encoded by 3x8 bit if not compressed. This makes $$2^{3*8} = 16,7 Mio$$ different colors. Reducing this number to K prototypic colors and replacing the original colors with these prototypical colors enables us to drastically cut down on bits to transmit. A data vector $$\vec{x_i} \in \Re^3$$ os the color triple of pixel number i. The cluster centers $$\vec{w_i} \in \Re^3$$ are the prototypic colors. 

**(?P5-Visualisation?)**

### Soft clustering
So far we described clusters as sets of data points or by their centers which means that they where disjoint. This is called **hard clustering** because each data point is assigned to a single cluster. There is no way to express uncertainty about the assignment to a cluster.

When clustering softly we assign a data point to a cluster by probabilities. This allows us to express uncertainty about the assignment or gradual assignment. Clusters do not have hard boundaries. We will assign **gaussians** to each cluster center.

The probability density of the data distribution $$D = \{\vec{x_1}, \vec{x_2}, ...\}, \vec{x_i} \in \Re^d$$ is a linear superposition of K Gaussians: $$P(\vec{x}) = \sum_{k=1...K}g_k N(\vec{x}, \vec{\mu_k}, C_k)$$ where $$N(.,.,.)$$ is a Gaussian with mean $$\vec{\mu}$$ and covariance matrix $$C$$. The "amplitude" assigned to a Gaussian centred at $$\vec{\mu}$$ is $$g_k$$, which is the a prioiri probability that a data point belongs to cluster $$k$$.\
So $$0 \seq g_k \seq 1$$ and $$\sum_{k=1...K}g_k = 1$$ must hold.



### Conceptual clustering: Cobweb