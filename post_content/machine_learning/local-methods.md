---
layout: post
title: Machine Learning - Local Methods
---
### Instance-based learning
The idea is to store the training examples $$D = \{(\vec{x^n}, \vec{t^n})\}$$, $$\vec{x^n}\in\Re^{d_{in}}$$, $$\vec{t^n}\in\Re^{d_{out}}$$

This leads to the *nearest neighbor* algorithm:
Training consists of memorizing all examples and for an unknown input $$\vec{x}$$, find the best match $$\vec{x}^n$$ of the training samples. The output is $$\vec{t^n}$$.

#### K-nearest neighbor
For unknown input $$\vec{x}$$, find the set $$S$$ of the $$k$$ nearest neighbors of strores samples.
* for discrete valued output: vote among $$k$$ nearest neighbors
* for real values output, use mean of $$k$$ nearest neighbors $$\vec{y} = 1/k \sum_{i\in S}\vec{t^i}$$

**Properties:**
- plain nearet neighbor approach assigns stored output to complete Voronio tesselation cell around the sample input $$\rightarrow$$ hard boundaries
- K-nearest neighbors allow continous transitions
- suitable choice for $$k$$ depends on the local intrinsic data dimensionality
- Training:
    * very fast
    * require memory (roughly equivalent to # examples)
    * does not waste information
    * does not require parameter settings or complex procedures
- Application:
    * may be slow (for many stored examples)
    * sensitive to errors and noise

**Distance-weighted k-nearest neighbors:**
The idea is that nearer neighbors are more important than far ones. Note that the chosen $$k$$ is global and difficult as the intrinsic dimension is unknown and may change locally.

Improve k-nearest neighbors by weighting with the distance to the input $$\vec{x}$$ ($$S$$ is the set of the indices of the $$k$$ nearest neighbors): $$\vec{y} = (1 / \sum_{i\in S}w_i) \sum_{i\in S} w_i \vec{t^i}$$ with the inverse distance as weight $$w_i = 1 / \| \vec{x} - \vec{x^i}\|$$. Precautions for "direct hit" $$\vec{x} = \vec{x^i}$$ are necessary. Note now the neighbors can be entire set of examples!

**Locally weighted regression:**
K-nearest neighbors approximate $$\vec{y}(\vec{x})$$ **locally** for each sample point. The idea is to construct better local approximation of $$\vec{y}(\vec{x})$$ by computing a fit function in the region surrounding the sample points.

There are two choices to make:
* **Fit function**, e.g., linear or quadratic
* **Error function** which will be minimized, e.g.m by gradient descent to get the best parameters of the fit function. The error function should be local.

Possible error functions:
1. squared error over only the $$k$$ nearest neighbors: $$E_1(\vec{x}^n) = 1/2 \sum_{\vec{x}\in \{k nearest neighbors of \vec{x}^n\}}(\vec{t^n} - \vec{y}(\vec{x^i}))^2$$
2. error over the entire data set $$D$$ where the error of each training sample $$\vec{x^i}$$ is weighted by a decreasing function $$K$$ of its distance to $$\vec{x^n}$$
3. combine 1 and 2

### Radial basis functions
RBFs provide a global approximation of a target function by a linear combination of local approximations. This method is related to distance weighted regression and neural networks. Like MLPs, RPFs represent a mapping $$\vec{x} \rightarrow \vec{y}, \vec{x} \in \Re^{d_{in}}, \vec{y}\in\Re^{d_{out}}$$

**Architecture:**
- single layer of units / neurons
- each neuron gets the same input
- activation of a neuron according to match between input and weights
- activation function is unimodal (usually a Gaussian), not sigmoid!
- activation function is usually called kernel function, since it defines an "area of responsibilit" in the input space
- neurons contribute to vector values output by their weights
- highly activated neurons contribute more
- thus the output function is represented by local functions with "compact support"

Output of the RBF network with $$N$$ neurons: $$\vec{y} = \vec{w_0} + \sum_{i=1...N}\vec{w_i}K_i(\|\vec{x}-\vec{\xi_i}\|)$$ with the kernel function $$K_i(\|\vec{x}-\vec{\xi_i}\|) = exp(-(1/2 \sigma_i^2)\|\vec{x}-\vec{\xi_i}\|^2)$$.

**Training:**
1. find suitable "centers" $$\vec{\xi_i}\in\Re^{d_{in}}$$
2. find suitable "radii of incluence" $$\sigma_i$$
3. find *output weights* $$\vec{w_i}\in\Re^{d_{out}}$$ to form output

Several methods exist to solve these tasks:\
Finding suitable input weights $$\vec{\xi_i}$$:
* use examples (instances): $$\vec{\xi_i} = \vec{x^i}$$
* clustering on input part of examples

Finding the radii:\
E.g., define the radius by distance to nearest neighbor, controlled by $$\gamma$$: $$\sigma_i = \gamma * min_{k /neq i} \vert \vec{\xi_i} - \vec{\xi_k} \vert$$

Output weights $$\vec{w_i}$$ like perceptrons: $$\Delta\vec{w_i} =\eta (\vec{t} - \vec{y})K_i(\|\vec{x}-\vec{\xi_i}\|)$$

**Compare RBF and MLP:**
* effect of an adaptation step:
    * RBF: only input component acts locally on one / some basis functions $$\rightarrow$$ affects only performance on data in this input area
    * MLP: input-output pair may change all weights $$\rightarrow$$ may affect performance on all data
* both have architectural parameters:
    * RBF: one easy to interpret parameter (# basis functions)
    * MLP: # layers, # neurons in each layer
* both have adaptation parameters:
    * RBF:
        * clustering parameters
        * radii
        * stepsize for supervised training
    * MLP:
        * stepsize
        * various others such as momentum
    - -> parameters of RBFs are decoupled and easy to interpret
    - -> effect of MLP parameters is difficult to predict as they interact in a complex way during the minimization


### Self-organizing maps
One of the big questions: Given signal data, how do we get an abstract, symbolic representation? Some important aspects of this task:
* **concept formation:** as long as we can not get that, at least find reasonable prototypes
* **filtering** relevant from irrelevant information
* finding **structure**, in particular, relations between concepts/prototypes

$$\rightarrow$$ A highly useful tool would be a *toppology preserving mapping* from signals to a higher level. In 1982, Teuvo Kohonen can up with the Kohonen-net or also self-organizing map (SOM).

SOMs are made of a 2 dimensional layer of neurons.
- for the first time, we consider the spatial (physical) arrangement of neurons in a layer
- all neurons receive the same input $$\vec{x}\in\Re^d$$
- competition:
    * the neuron at location $$\vec{s}$$ with best matching weights $$\vec{w_{\vec{s}}}$$ "wins", i.e., has highest excitation $$y_{\vec{s}}\in\Re$$
    * the best match neuron adapts its weights but lateral interaction causes neighboring neurons to adapt, too

**Notation:**
* input: $$\vec{x}\in\Re^d$$
* weights of neuron at grid location $$\vec{r}$$: $$\vec{w_{\vec{r}}}$$
* excitation of neuron at grid location $$\vec{r}$$: $$y_{\vec{r}}$$
* grid location of maximum excitation: $$\vec{s}$$ determined by $$\vec{w_{\vec{s}}} * \vec{x} > \vec{w_{\vec{r}}} * \vec{x}$$ for all $$\vec{r} \neq \vec{s}$$

Excitation over the layer caused by lateral interactions between the excitation center $$\vec{s}$$ and surrounding locations $$\vec{r}$$ is modeled by a unimodal function, usually the Gaussian:
$$h_{\vec{r}\vec{s}} = exp(-\vert\vec{r}-\vec{s}\vert^2 / 2\sigma^2)$$
Adaption rule(Kohonen's rule):
$$\Delta \vec{w_{\vec{r}}} = \eta * h_{\vec{r}\vec{s}} * (\vec{x} - \vec{w_{\vec{r}}})$$