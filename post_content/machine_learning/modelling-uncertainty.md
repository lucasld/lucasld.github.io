---
layout: post
title: Machine Learning - Modelling Uncertainy
---
There is several reasons why environments may be *uncertain*:
* environment is only partially observable
* sensors are unreliable
* the results of actions are uncertin
* high complexity

We deal with uncertainty using **probabilities of propositions**. Alternative: Model uncertainty using probalbilites of rules such as: $$LawnSprinkler \vert\rightarrow_0.99 WetGrass$$, $$WetGras \vert\rightarrow_0.7 Rain$$.

Probabilities summarize several factors:
- missing knwoledge
- incapability to devise complete models of complex domains
- chance


### Random variables
- modeling uncertainty using **random variables**
- types of random variable:
    * **Boolean** random variable:
        - e.g. $$Cavity$$ (Is there a cavit in my tooth?)
        - Values: $$<true, false>$$
    * **Discrete** random variable
        - e.g. $$Weather$$ has one of the values $$<sun, rain, cloudy, snow>$$
        - values must describe the domain sufficiently and be mutually exclusive
    * **Continous** random variable
        - values are real numbers
        - e.g. $$Length \in [1, 20]$$


### Propositions
- a **proposition** is made by assigning a value to a random variable:
    - $$Weather = sun$$
    - $$Length = 2.4$$
- complex propositions are made by using logical operators to connect simple propositions: $$Weather = sun \vee Cavity = false$$
- notation:
    * random variables with capital: $$Weather$$, but values: $$sun$$
    * but: $$cavity$$ means $$Cavity = true$$; $$\neg cavity$$ means $$Cavity = false$$; $$sun$$ means $$Weather = sun$$


### Atomic events
A **complete** specification of the state of the domain (the agent may be uncertain about the state). For example if the domain is fully descibed by the boolean variables $$Cavity$$ and $$Toothache$$ then there are 4 atomic events.

Atomic events are mutually exclusive and describe the domain completely.


### Probability distribution
* **A-priori** or **unconditional** probabilities of propositions: $$P(Cavity=true)=0.1$$ or $$P(Weather=sum)=0.72$$ denote the probability of guesses. The probabilities may change when new information becomes available.
* the **probability distribution** $$P$$ comprises the probabilities of all values: $$P(Weather)=<0.72, 0.1, 0.08, 0.1>$$ for values $$<sun, rain, cloudy, snow>$$
* $$P$$ is **normalized**, ie., sum = 1
* **Joint probability distribution** for several random variables comprises all atomic states $$P(Weather, Cavity)$$ is a 4x2 matrix
* the joint probability distribution holds the entire knowledge about the domain!


### Conditional probability
* **conditional** or **posterior** probability: $$P(cavity\vert toothache)=0.8$$, i.e., the information $$toothache$$ is known
* notation for conditional distributions: $$P(Cavity\vert Toothache)$$ 2-component vector
* if the additional information $$cavity$$ is known: $$P(cavity\vert Toothache, cavity)=<1, 1>$$
* additional information may be irrelevant: $$P(cavity\vert toothache, sun)=P(cavity\vert toothache)=0.8$$ or more general: $$P(Cavity\vert Toothache, sun)=P(Cavity\vert Toothache)$$
* domain knowledge of this kind facilitates finding the joint probability distribution
* **definition of conditional probability**: $$P(a\vert b)=P(a \wedge b)/P(b)$$ uf $$P(b) > 0$$
* **product rule** is an alternative formulation: $$P(a \wedge b) = P(a\vert b)P(b)=P(b\vert a)P(a)$$
* general version for distributions: $$P(Weather, Cavity) = P(Weather\vert Cavity)P(Cavity)$$. This means 4 x 2 seperate equations, not matrix multiplication

**Chain rule** (derived by successive application of product rule): $$P(X_1,....,X_n)=\Pi_{i=2^n}P(X_i\vert X_1,...,X_{i-1})P(X_1)$$


### Inference by enumeration
....


### Independence
$$A$$ and $$B$$ are **indendent** if and only if $$P(A\vert B)=P(A)$$ or $$P(B\vert A)=P(B)$$. With this, the product rule leads to $$P(A, B)=P(A\vert B)P(B)=P(A)P(B)$$

#### Conditional Independence
Consider $$P(Toothache, Cavity, Catch)$$, which has $$2^3 - 1 = 7$$ independent proabilities. Miind $$Catch$$ is **not independent** of $$Toothache$$: In general $$P(Catch\vert Toothache) \neq P(Catch)$$. Rather, $$P(Catch)$$ *does* depend on the value of $$Toothache$$ - it's far more likely finding a cavity provided there is $$toothache$$. But this holds only as long as the value of $$Cavity$$ is unknown.

Assume that:
1. for $$Cavity = true$$ the probability that the dentist finds the cavity does not depend on whether there is toothache or not $$P(Catch\vert Toothache, cavity) = P(Catch\vert cavity)$$
2. for $$Cavity = false$$ the probabilit for a catch is independent of $$Toothache$$ likewise $$P(Catch\vert Toothache, \neg cavity)=P(Catch\vert\neg cavity)

Summarizing 1 and 2, $$Catch$$ is **conditionally indendent** of $$Toothache$$ **given the value of** $$Cavity$$: $$P(Catch\vert Toothache, Cavity) = P(Catch\vert Cavity)$$. Likewise, $$Toothache$$ is conditionally indendent of $$Catch$$ given $$Cavity$$: $$P(Toothache\ Catch, Cavity) = P(Toothache\vert Cavity)$$