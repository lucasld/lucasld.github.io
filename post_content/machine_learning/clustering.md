---
layout: post
title: Machine Learning - Clustering
---
Why would we want to cluster data? For one, clusters in some feature space may indicate closeness of data on a semantic level. Also, clusters allow us to compress data as it sufficies to only transmit cluster centers instead of the data belonging to the clusters.
### Distance measures
There are ceveral options to measure the distance between clusters. For clusters $$X$$ and $$Y$$ you might use:
* $$D_min(X, Y) = min_{\vec{x}\in X, \vec{y}\in Y}d(\vec{x}, \vec{y})$$ this is the mimimum difference
* $$D_max(X, Y) = max_{\vec{x}\in X, \vec{y}\in Y}d(\vec{x}, \vec{y})$$ this is the maximum difference
* $$D_mean(X, Y) = 1/{\vert X \vert \vert Y \vert}\sum{\vec{x}\in X, \vec{y}\in Y}d(\vec{x}, \vec{y})$$ mean of all distances
* $$D_centroid(X, Y) = d(1/{\vert X \vert} \sum_{\vec{x}\in X} \vec{x}, 1/{\vert Y \vert} \sum_{\vec{y}\in Y})$$ distance between cluster centers

Given a data distribution, it is not clear what clusters an algorithm should find. The definition of clusters depends on scale.


### Bias in clustering
All clustering algorithm have some kind of bias:\
* a certain cluster model is prefered
* the model comprises scale and shape of clusters
* usually bias is an implicit part of the algorithm
* adjustable parameters are usually processing parameters (of the algorithm), not model parameters
* the conncetion between parameters and the implicit cluster model usually needs to be inferred from the way the algorithm is working
* hierarchical clustering solves the problem for the scale parameter insofar as all solutions on different scales are presented in an ordered way


### Hierarchical clustering
There are two complementary methods:\
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

*Single linkage clustering* employs the minimum cluster distance.\
*Complete linkage clustering* employs the maximum cluster distance.\
Single linkage clustering tends to chaining and complete linkage clustering prefers compact clusters. We can also use *average linkage clustering* or *UPGMA* (Unweighted Pair Group Method with Arithmetic mean). In *centroid clustering* centroid distance is used. Here real valued attributes are required for the centroid computation. Also, when joining two clusters, the resulting centroid is dominated by the cluster with more members.

*Ward's minimum variance clustering:* Merge the pair of clusters for which the increase in total variance is mimized.
$$E = \sum_i \sum_{\vec{x}\in C_i} (\vec{x} - \vec{\mu_i})^2$$, $$\vec{\mu_i} = 1/{\vert C_i \vert} \sum_{\vec{x}\in C_i}\vec{x}$$
### Optimization based clustering

### Compression by clustering

### K-means clustering

### Soft clustering

### Conceptual clustering: Cobweb