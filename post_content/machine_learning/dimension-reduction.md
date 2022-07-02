---
layout: post
title: Machine Learning - Dimension Reduction
---
High dimensionality of our data is problematic as it can make working with the data difficult. Often the intrinsic dimensionality of our data is low but the extrinsic dimenionality is high. For example we might work with HD-images (1920x1080x3) that have 6_200_800 dimensions but perhaps the data we are actualy interested can be encoded in much fewer dimensions.

**Aims of dimension reduction:**
- find local dimensionalities of the data manifold
- find new coordinate system to represent the data manifold
- project data onto the new coordiante system => get rid of the empty party of the space of description parameters
- the new parameters may be more meaningful than the original description parameters


### Curse of dimensionality
- combinatorial explosion: for $$d$$ variables with $$n$$ values each, there are $$n^d$$ combinations which is the volume of the resulting space
- $$n^d$$ points are necessary to sample a $$d$$-dimensional space of continopus variables with $$n$$ sampling points on each axis. Thus, dense sampling becomes impossible for larger $$d$$.
- real data sets will not be able to "fill" a space of high dimension
- pairs of vectors chosen at random from a space of high dimensions are likely to:
    - have similar distances
    - be close to perpendicular to each other

**Inntrinsic dimensionality:**
- number of independent parameters necessary to describe the data
- depends on the problem, not the data representation

**Descriptive / Extrinsic dimensionality:**
- number of parameter used in unprocessed data set
- depends on the type of representation


### Principal component analysis
Principal component analysis (PCA) is a commonly used method of dimension reduction. The idea is to find the subspace that captures most of the data variance. It is a form of unsupervised learning. Given a data set $$D = \{\vec{x_1}, vec{x_2}, ...\}$$, $$\vec{x_i}\in\Re^d$$ with zero mean: $$<\vec{x}> = \sum_{i=1...\vert D\vert}\vec{x_i} = 0$$. *PCA* finds $$m < d$$ orthonormal vectors $$\vec{p_1}...\vec{p_m} such that the $$\vec{p_i}$$ are in the directions of largest variance of $$D$$.

* the vectors $$\vec{p_i}$$ are the $$m$$ **eigenvectors** of the covariance matrix C = (C_{ij}) = (<\vec{x}\vec{x}^T>_{ij})$$ with largetst eigenvalies $$\lambda_i$$: $$C\vec{p_i} = \lambda_i \vec{p_i}$$
* since $$C$$ is symmetric and real, the $$\lambda_i$$ are real and there is an orthonormal basis of eigenvectors $$\vec{p_i}\vec{p_j} = \delta_{ij}$$
* exapansion of $$\vec{x_i}$$ using of all eigenvectors would yield $$\vec{x_i}$$ without error (provided all $$\lambda_i \neq 0$$): $$\vec{x_i} = \sum_{j=1...d}a_{ij}\vec{p_j}$$ with $$a_{ij}=\vec{x_i}\vec{p_j}$$
* to obtain an approximation $$\vec{z_i}$$ of $$\vec{x_i}$$, only $$m < d$$ basis vectors are used (Karhunen-Loeve expansion): $$\vec{x_i} \approx \vec{z_i} = \sum_{j=1...m}a_{ij}\vec{p_j}$$ provided the eigenvectors are ordered such that $$\lambda_1 \geq \lambda_2 \geq ... \geq \lambda_d$$
* the eigenvectors are called the *principal components*
* they can be interpreted as *features*, *receptive fields* or *filter kernels*
* expansion after $$m < d$$ eigenvectors of largest eigenvalues is the optimal linear method to minimize the mean square reconstruction error: $$E=\sum_{i=1...\vertD\vert}(\vec{z_i} - \vec{x_i})^2$$

The coefficients $$a_{ij} = \vec{x_i}\vec{p_j}$$ are pairwise uncorrelated and the eigenvalues are the variances $$1/{\vert D\vert} \sum_{k=1...\vert D\vert}a_{ki} a_{kj} = \delta_{ij}\lambda_j$$

The approximation $$\vec{z_i} = \sum_{j=1...m}a_{ij}\vec{p_j}$$ is the projection of $$\vec{x_i}$$ onto the m-dimensional subspace $$span\{\vec{p_1}...\vec{p_m}\}$$ of $$\Re^d$$.

The residuum is $$\delta\vec{x_i} = \sum_{j=m+1...d}a_{ij}\vec{p_j}$$. 

The variance of the residuum over all data is $$\sigma^2(\delta \vec{x}) = \sum_{i=m+1...d}\lambda_i$$, i.e., the mean approximation error is the sum of the left out eigenvalues.

To find a suitable number m of eigenvectors we have to look at the spectrum of eigenvalues. We hope to find a specific jump in the spectrum indicating a suitable cuto off number.

**Note** PCA does not generate structure but only makes existing strucutre accessible!

**PCA: Summary:**
- PCA is the most widespread and simple method for linear dimension reduction
- easy computation from eigenvectors of covariance matrix, high dimensionality max require special / approximative methods
- purely variance based method
- semantics of the eigenvectors (if any) must be found in subsequent analyis
- linear dimension reduction is inappropriate for
    - nonlinear distributions
    - clusterd distributions
