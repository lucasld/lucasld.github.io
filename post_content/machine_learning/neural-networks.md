---
layout: post
title: Machine Learning - Neural Networks
---


### Computer vs. brain
**Computers:**
* fast sequential processing
* high effort for parallelization to just a few processors
* symbolic processing withoutn errors
* no redundancy
* due to lack of software, very bad at pattern recognition, learning, robot control etc.
* progress in AI fields where symbolic formalism is available, e.g., data base management or games
* adaptivity is iomplemented by software, not hardware

**Brain:**
* highly parallel: $$\sim 10^10$$ neurons
* $$10^4 - 10^5$$ connections per neuron
* slow: neuron switching time $$\sim 1$$msec
* scene recognition in $$\sim 0.1$$sec $$\rightarrow$$ only $$\sim 100$$ sequential steps, but highly parallel
* high redundancy: death of neuron is compensated by others
* high plasticity of hardware
* very good at tasks such as pattern recognition, robot control etc.
* surprisingly bad at symbolic computation $$\rightarrow$$ high bias for the above tasks!

Idea of Neuroinformatics: mimic neural principles by software!

**Neurons:**
What we learn from neurobiology:
* neurons have many inputs but only one output
* firing rate of neurons codes its activity
* activity is increased when the neurons gets input from other neurons via axons
* the input from the axons is weighted differently by the synapses
* a neuron has a nonlinear activation function: below a treshold, it will fire little, then there is an increase of its firing with the input, then saturation is reached
* best modeled by a sigmoid activation function

**Formal neurons**
The basic neuron model used in Neuroinformatics is a ver simple abstraction of the neurobiological findings! It consists of a $$d$$ input and one input. Also every input $$x_i$$ is weighted by a weight $$w_i$$. Also there exists a bias input which is alwas 1 and also has a weight. All these inputs are summed as such: $$s = \sum_{i=1...d} w_i x_i + w_{bias}$$. This summed input is passed through a activation function such as a sigmoid.

Activation functions:
- Fermi function
- tanh
- grossberg's function
- thresholding function
- sigmoid
- linear
- relu


### Types of learning
* **Unsupervised learning**
    - no teacher, examples are unlabeled
    - effect of learning is coded in learning rules
* **Supervised learning**
    - teacher who labels examples and thereby provides knowledge
    - learning is directed at mapping input part (e.g., stimulus) of the examples to the label as an output (e.g. class)
* **Reinforcement learning**
    - "weak teacher:" agent tries to reach a goal and the teacher tells the agent wether the has been reached (by providing reward)
    - the agent has to find the way by itself as reward is not immediate
* **Selfsupervised learning**
    - can be seen as mixture between unsupervised and supervised learning
    - learns in two steps, intializes weights with pseudo labels and then contiues supervised or unsupervised
    - gaining in popularity as there is so much unlabeled data


### Hebbian learning
Formulated in 1949 by Donald Hebb. It is one of the first ideas how learning can arise in neurons or neural networks based on a simple mechanism.

**Formula:**
$$\Delta w_{ij} = \eta * a_i * a_j$$ can also be written as $$\Delta\vec{w} = \eta * y(\vec{x} \vec{w})\vec{x}$$ for all incoming weights of a neuron.
* $$\Delta w_{ij}$$ - change of weight $$w_{ij}$$ connecting neuron j with neuron i
* $$\eta$$ - learning rate
* $$a_i$$ - activation of neuron i
* $$a_j$$ - activation of neuron j which is connected to neuron i

#### Limit weight growth
One problem with this is, that since weights never decrease, they become arbitrarily large. There are several solutions to this:
- decay term: $$\Delta w_{ij} = \eta * a_i * a_j - \lambda * w_{ij}$$
- dynamic normalization $$\Delta w_{ij} = \eta * a_i * a_j - \lambda * w_{ij} * (w_{ij}^2 - 1)$$
- explicit normalization $$w_{ij}^{new} = (w_{ij}^{old} + \Delta w_{ij}) / \vert w_{ij}^{old} + \Delta w_{ij}\vert$$
- Oja's rule (Erkii Oja, 1982) uses weight decay $$\sim y^2$$: $$\Delta \vec{w} = \eta * y(\vec{x}\vec{w})(\vec{x} - y(\vec{x}\vec{w})*\vec{w})$$

#### Effect of Heeb's rule for a pair of neurons
The connection between two neurons, represented by the weight of the postsynaptic neuron, will increase during training until an equilibrium with the decay term is reached. Then, the weight is proportional to the correlation of the activity of the neurons.

#### Effect of Hebb's rule on the weight vector
Averaged over many learning steps with small variance and data which leads to our activation to remain within the linear range of our activation function (so that it can be approximated by a linear function) holds: $$<\Delta \vec{w}> = \eta <(\vec{x}\vec{x}^T)>\vec{w} = \eta C \vec{w}$$

**....**

For $$t \rightarrow \infty$$ the weight vector converges to the eigenvector of $$C$$ with the largest eigenvalue. **Similar to PCA hebbian learning finds the largest PCs.**

#### Habituation and Anti-Hebb rule
What happens when we modify Hebb's rule to an **Anti-Hebb rule** $$\Delta \vec{w} = - \eta y(\vec{x}^T\vec{w})\vec{x}$$?

* as $$\vec{w}$$ becomes orthogonal to a repeated stimulus $$\vec{x}$$, this stimulus no longer leads to activation of the neuron since $$\vec{x}\vec{w}=0$$
* $$\vec{w}$$ filters out *new* stimuli
* if several stimuli $$\vec{x_1}, \vec{x_2}, ..., \vec{x_n}$$, $$n < d$$, are presented repeatedly, only the $$\vec{w}$$-component orthogonal to $$span\{\vec{x_1}, \vec{x_2}, ..., \vec{x_n}\}$$ remains
* so only stimuli $$\vec{x}\in V$$ with $$V \perp span\{\vec{x_1}, \vec{x_2}, ..., \vec{x_n}\}$$ can "pass" the filter, i.e., activate the neuron.

#### Extracting more PCs using Hebb's rule
So far: a single Hebb-neuron extracts $$\vec{v_1}$$. To extract more principal components from $$D$$, there are two ways:

**.....**

#### Summary
* unsupervised learning by a simple rule to modify the weights of a single neuron
* motivation: classical conditioning
* Hebb-neuron learns association of stimuli from correlation
* weight vector directs itself in the direction of the principal component of the data distribution with largest eigenvalue
* Anti-Hebb rule implements habituation, weight vector becomes orthogonal to all repeated stimuli thus new stimuli can be filtered out
* PCA is possible by a chain of Hebb neurons, where earlier neurons filter PCs of large eigenvalues out of the input for the training of the later neurons
* chain can be trained either successively or all at once using a combination of the Hebb rule with lateral anti Hebb rule


### Perceptron
It's pratical use is limited, but the perceptron is the building block of the multiplayer perceptron.

The perceptron is trained iteratively using labeled data set $$D = \{(\vec{x}^n, \vec{t}^n)\}$$, $$\vec{x}^n\in \Re^d$$, where $$t^n$$ is the target value (i.e., the label, class, etc. provided by the teacher) for input $$\vec{x}^n$$.

#### Training rule
$$\Delta \vec{w} = \eta (t - y) \vec{x}$$, $$\eta$$ is a small learning rate. Convergence can be shown if $$\eta$$ is sufficently small and if the task is solvable by a perceptron. The perceptrin can represent the hypotheses space $$\{\vec{w} \vert \vec{w} \in \Re^{d+1}\}$$. The *"decision surface"* represented by a perceptrin is de $$d-1$$ dimensional hyperplace orthogonal to $$\vec{w}$$. Data on the "positive side" of the hyperplace with $$\vec{x}\vec{w}>0$$ get $$y=1$$, the rest $$0$$.

#### Class seperability
The data must be *linearly seperable*, i.e., the two classes must be on the two sides of a hyperplace. If the data goes through the hyperplace, a nonlinear seperatrix is required!

#### Convergence speed
Provided classes are linearly seperable, there are still easy and difficult seperation tasks. A small hypothesis space requires more training steps until convergence is achieved.

#### Logic operations
A perceptrin with two boolean inputs (and the 1-component) can implement AND, OR, NAND and NOR but **not XOR**

The **XOR-problem** can be solved b "distortion" of the input space to obtain a "feature space" , i.e., a nonlinear transform $$\vec{f(\vec{x})}$$ of the inputs. Alternatively, $$x_3 = x_1 * x_2$$ can be added as antother input channel.

#### Learning rule from error function
The learning rule can be derived from minimizing the mean square error: $$E[\vec{w}] = 1/2 \sum_{i=1...\vert D\vert}(t^i - y(\vec{x^i}))^2$$

Gradient descent: $$\Delta\vec{w} = -\eta \sum_{i=1...\vert D\vert}(t^i - y(\vec{x^i}))(-\vec{x^i})$$

Stochastic approsimation: $$\Delta\vec{w} = -\eta (\vec{t^i} - y(\vec{x^i}))\vec{x^i}$$

#### Batch mode and incremental mode
The stochastic approximation is also called incremental mode (in contrast to batch mode):

**Batch Mode:**

$$\Delta\vec{w} = \eta \sum_{i=1...\vert D\vert}(t^i - y(\vec{x^i}))\vec{x^i}$$

Gradient descent with respect to the entire training set $$D$$.

**Incremental mode:**

$$\Delta\vec{w} = -\eta (\vec{t^i} - y(\vec{x^i}))\vec{x^i}$$

Gradient descent with respect to only ine example $$(\vec{x^i}, \vec{t^i})$$ at a time. For sufficently small $$\eta$$, incremental gradient descent can be shown to approximate batch gradient descent arbitratily close.

#### Summary
- simple supervised learning rule for a single neuron
- learning rule can be derived from mean squre error function
- convergence proven
- large margin between linearly seperable classes leaves many possible weight vector (large hypothesis space), so the task is easier and convergence is faster
- can only sole linearly seperable tasks
- most famous example for nonlinear two-class seperation is XOR
- XOR can not be solved by perceptrin except with highly problem specific add-ons (this led to a temporary drop in the interest in ANN)


### Multilayer Perceptron
The idea is to solve nonlinear seperation tasks with non linear seperatices and with class coering disjoint areas by combining several perceptrons. In addition it is possible to generate several outputs.

#### Architecture
- Input layer with one neuron for each component of the input vector $$\vec{x}$$. The input "neurons" do nothing but represent the input.
- at least one hidden layer
- hidden layers may have different numbers of neurons
- number of output neurons is dimensioanlity of the output vector $$\vec{y}$$
- *feed forward achitecture:* only connections from layer $$k$$ to layer $$i$$ with $$k < i$$
- generaliuzation to a directed graph: conncetions skipping layers are allowed. This case is not consided here since such can be represented by additional linar neurons

Linear actiovation function would not do, since a succession of linear transforms (represented by the layers) can be replaced by a single linear transform $$\rightarrow$$ use **sigmoid activation** function $$\sigma$$.
* step function enforces a "decision"
* soft step required because backpropagation algorithm needs differentiablity
* **squashing:** maps the incoming information to a much smaller range

#### Backpropagation
**Error signal**

Output layer:\
For $$i=1...N(L_H+1)$$: $$\delta_i{L_H+1} = \sigma'(s_i) * (t_i - y_i(\vec{x})$$

Hidden layers:\
For $$i=1...N(k)$$: $$\delta_i(k) = \sigma'(s_i(k)) * \sum_{j=1...N(k+1)}w_{ji}(k+1, k)\delta_j(k+1)$$

**Weight update**

To compute the new weight add $$\Delta w_{ji}(k+1, k) = \eta \delta_j(k+1)o_i(k)$$ to the old weight.

- a weight of neuron $$j$$ is adaped in proportion to
    - the activation of the neuron in the previous layer to which it is connected
    - the weighted errors it causes at the outputs
- the complex scheme is necessary sinec target values are available only for the outputs, not the neurons in the hidden layers
- the backpropagation algorithm performs a stochastic approximation to gradient descent for the error function $$E$$ (based on one sample at a time)
- minimization
    - is computationally expensive
    - suffers from numerous local minima
    - is difficult to terminate: achieve good minimization without overfitting

##### Local minima
Two (of many) ways to avoid local minima:
**Repeat:** Training with different random initial weights in the hope minimization is caught in different basins of attraction

**Annealing:** Add noise, e.g., every $$n$$ learning steps: $$w_{ji}(k+1, k) \leftarrow w_{ji}(k+1, k) + T \zeta_{ji}(k+1, k)$$ where $$\zeta$$ is a Gaussian random variable with $$<\zeta> = 0$$ and $$\zeta_{ji}(k+1, k)$$ are pairwise uncorrelated. $$T$$ is the "temperature", denoting the amount of noise added. $$T$$ is gradually decreased during training. Annealing improves minimization but requires more learning steps.

**Step size adaption:** Increade $$\eta$$ in flat regions and decrease $$\eta$$ in steep terrain. Step size adaption:
$$a(z) =  \begin{array}{cc} 1 \\ 2 \\ 3\end{array}$$
$$alpha(x)=\left {
                \begin{array}{ll}
                  x\\
                  \frac{1}{1+e^{-kx}}\\
                  \frac{e^x-e^{-x}}{e^x+e^{-x}}
                \end{array}
              \right$$