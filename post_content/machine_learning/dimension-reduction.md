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
Principal component analysis (PCA) is a commonly used method of dimension reduction. The idea is to find the subspace that captures most of the data variance. It is a form of unsupervised learning. Given a data set $$D = \{\vec{x_1}, vec{x_2}, ...\}$$, $$\vec{x_i}\in\Re^d$$ with zero mean: $$<\vec{x}> = \sum_{i=1...\vert D\vert}\vec{x_i} = 0$$. *PCA* finds $$m < d$$ orthonormal vectors $$\vec{p_1}...\vec{p_m}$$ such that the $$\vec{p_i}$$ are in the directions of largest variance of $$D$$.

* the vectors $$\vec{p_i}$$ are the $$m$$ **eigenvectors** of the covariance matrix C = (C_{ij}) = (<\vec{x}\vec{x}^T>_{ij})$$ with largetst eigenvalies $$\lambda_i$$: $$C\vec{p_i} = \lambda_i \vec{p_i}$$
* since $$C$$ is symmetric and real, the $$\lambda_i$$ are real and there is an orthonormal basis of eigenvectors $$\vec{p_i}\vec{p_j} = \delta_{ij}$$
* exapansion of $$\vec{x_i}$$ using of all eigenvectors would yield $$\vec{x_i}$$ without error (provided all $$\lambda_i \neq 0$$): $$\vec{x_i} = \sum_{j=1...d}a_{ij}\vec{p_j}$$ with $$a_{ij}=\vec{x_i}\vec{p_j}$$
* to obtain an approximation $$\vec{z_i}$$ of $$\vec{x_i}$$, only $$m < d$$ basis vectors are used (Karhunen-Loeve expansion): $$\vec{x_i} \approx \vec{z_i} = \sum_{j=1...m}a_{ij}\vec{p_j}$$ provided the eigenvectors are ordered such that $$\lambda_1 \geq \lambda_2 \geq ... \geq \lambda_d$$
* the eigenvectors are called the *principal components*
* they can be interpreted as *features*, *receptive fields* or *filter kernels*
* expansion after $$m < d$$ eigenvectors of largest eigenvalues is the optimal linear method to minimize the mean square reconstruction error: $$E=\sum_{i=1...\vert D\vert}(\vec{z_i} - \vec{x_i})^2$$

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

For clustered distributions **local PCA** can be used, for nonlinear distributions we can use **principal curves**.

**Local PCA**\
Find cluster centers, then compute PCA individually for each cluster. Better: iteratively improve position of cluster centers and local PCs.
- for continous, nonlinear distributions (not clustered), local PCA does not yield a contiuous description of the manifold
- further, *different clusterings* are possible on a continous distribution, leading to entirely *different local projection* systems


### Principal curves
Principal curves / surfaces are a nonlinear extension of PCA. The issue is to find appropriate dimensionality and an appropriate "flexibility", i.e. parameterization, of the fit function.

Generalize approximation to a parameterized surface $$\vec{X}(a_1...a_m; \vec{w})$$ of m dimensions. The vector $$\vec{w}\in\Re^n$$ sumarizes the n parameters which determine the shape iof the surface and need to be found by minimizing $$E = 1/2 \int (\vec{x}- vec{X}(a_1(\vec{x}) ... a_m(vec{x}); \vec{w}))^2 P(\vec{x})d\vec{x}$$
The m parameters $$a_i(\vec{x})$$ determine the point of the surface of $$\vec{X}$$ that best matches $$\vec{x}$$ and have to be computed for each $$\vec{x}$$ individually.

The numner n of parameters $$\vec{w}$$ is responsible for the ability of $$\vec{X}$$ to fit a manifold. Small n tend to lead to underfitting and too large n to overfitting. To ensure a good fit, additional *smoothness constraints* should be used.

The parameters $$\vec{w}$$ can be found for $$P(\vec{x})$$, e.g., by gradient descent. The problem is that each step requires integration over all data. The solution is *stochastic approximation*. Make the downhill step only with respect to a single sample: $$\triangle \vec{w} = \epsilon (\vec{x} - \vec{X}(a_1(vec{x})...a_m(\vec{x}); \vec{w})) * \partial/{\partial \vec{w}} \vec{X}(a_1(vec{x})...a_m(\vec{x}); \vec{w})$$ hoping that minimization for a succession of many samples with small stepsize results in minimization of $$E$$.

....


### Visualization of high dimensional data
- full automated anaylisis of high dimensional data is often not possible
- humans habe highly developed pattern recognition abilities
- visualization is a huge field - only a brief overview of basic techniques for the problem of high dimensionalit is given
- two major directions:
    * for not too high dimensionality (typically < 10), some methods allow display of the complete information (alternatively, some selected dimensions) in 2 or 3 dimensions
    * for high dimensionality, reduction techniques such as PCA can be used to display a projection to 2 or 3 dimensions
- PCA is the most well known projection technique but other methods are better suited to show structure.

**Methods:**
- scatterplot matrix - a matrix of several 2 plots
- glyphs - map each dimension onto the parameters of geometrical figure (starglyphs)
- chernoff faces - map parameters onto facial features as the brain is optimized to analyze facial features (fusiform face area)

#### Projection pursuit
The idea is to project the data onto 2-3 selected directions like PCA, but choose directions where the data exhibits interesting *structure*.

**What is interesting?**
* **variance** (otherwise, data are on the same spot)
* distribution that is **not gaussian**
* **clusters**

**Procedure:**
1. select 1-3 directions (e.g., by PCA or simlpy original dimensions)
2. project onto these directions, get density $$P(\vec{x})$$ of the projected data
3. compute an *index* function (how interesting is the density)
4. *maximize* index by searching for better directions

**Indices**
Indices to measure the deviation of a distribution $$P(\vec{x})$$ (which has been normalized to zero mean and variance 1) from the standardized normal distribution $$N_1{\vec{x}}$$ (with variance 1):
- **Friedman-Tukey index:** $$I_{FT} = \int P^2(\vec{x}) d\vec{x}$$ minimized when $$P$$ is a parabolic function similar to normal distribution.
- **Hermite** or **Hall index:** $$I_H = \int (P(\vec{x})-N_1(\vec{x}))^2 d\vec{x}$$ minimized when P is a standardized normal distribution
- **Natural Hermite index:** $$I_{NH} = \int (P(\vec{x}) - N_1(\vec{x}))^2 N_1(\vec{x}) d\vec{x}$$ like Hermite index, but higher weighting to the center
- **Entropy index:** $$I_E = \int P(\vec{x})\log P(\vec{x}) d\vec{x}$$ minimized by standardized normal distribution (note its not $$- P \log P$$!)

**Problem:** Maximization requires estimation of the density $$P(\vec{x})$$ of the projected data. Mathods are 1. kernel density estimation, 2. orthonomal function expansion

**Index for finding clusters:**
Clustered distributions exhibit more short distnaces between pairs of points than unstructured distributions (for identical variance).
