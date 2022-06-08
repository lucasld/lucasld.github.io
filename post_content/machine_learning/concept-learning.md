---
layout: post
title: Machine Learning - Concept Learning
---
Concept Learning is the search in the space of hypotheses for the hypothesis best fitting the examples.\
Let's assume our target function is binary and each example/instance contains 5 binary attributes. In this case there are $2^5 = 96$ possible instances. How our hypothesis space looks like dependes on how we represent a hypothesis. We define our hypothesis to be a conjunction of constraints on the 5 attributes.\
Each constraint can be:
- a specific value, $attribute1 = true$
- value unimportant, e.g. $attribute1 = ?$
- no value allowed, e.g. $attribute1 = \varnothing$

As every attribute can either be false or true and additionaly may contain the values $?$ and $\varnothing$ there is $4^5 = 1024$ possible hypothesis. As a hypothesis containing at least one $\varnothing$ represents an empty set of instances, there are only $1+4^4 = 257$ sementically distinct hypothesis.

**Inductive Learning Hypothesis:** Any hypothesis found to approximate the target function well over a sufficently large set of training examples will also approcimate the target function well over other unobserved examples.

### Find-S algorithm
The Find-S algorithm is a algorithm which goes from the maximally general hypothesis to a maximally specific hypothesis. A hypothesis $h_2$ is more or equally generally than $h_1$ iff any instance that is classified positive by $h_1$ is also classifies positive by $h_2$.

```python
init h to the most specific hypothesis in H
for each positive training instace x do:
    for each attribute constrain a_i in h do:
        if (a_i is not satisfied by x) then:
            Replace a_i in h by the next more general constraint that is satisified by x
return h
```

**Disadvantages:**
- learns nothing from negative examples
- can't tell wether it has learned the concept
- can't tell wether training data is inconsistent
- picks maximally specific h
- depending on H, there might be several solutions

### Version Space
A hypothesis h is **consistent** with a set of training examples D of target concept c iff $h(x) = c(x)$ for each training example $(x, c(x)) \in D$.

$Consistent(h, D) \Leftrightarrow \forall(x, c(x)) \in D: h(x) = c(x)$

The **version space** $VS_{H,D}$ with repect to hypothesis space H and training examples D is the subset of hypotheses from H consistent with all training examples in D

$VS_{H,D} = \lbrace h \in H \| Consistent(h, D) \rbrace$

### List-Then-Eliminate algorithm
To obtain the version space, we start with all hypotheses. Then for each example the inconsistent hypotheses are eliminated.

```python
intialize VS to be the list containing all hypthesis h
for each (x, c(x)) in D do:
    for each h in VS do:
        if h(x) != c(x) then:
            Remove h from VS
return VS
```

Note that the List-Then-Eliminate algorithm can only be applied if the hypothesis space H is finite. It computes the complete version space as it iterates through all hypotheses. Ideally, only one hypothesis remains as this means that the examples define the hypothesis exactly. If the version space is an empty set, there are inconsistent examples.

### Representing version spaces
The version space is defined by a **general boundary** and a **specific boundary**.
- The **general boundary** G of version space $VS_{H, D}$ is the set of its maximally general members
- The **specific boundary** S of version space $VS_{H, D}$ is the set of its maximally specific members

Every member of the version space lies between (including) these boundaries:
$VS_{H, D} = \lbrace h \in H | \exists s \in S, \exists g \in G: g \geq h \leq s \rbrace$

### Candiate-Elimination algorithm
Having defined the VS by its boundaries we can now search the VS without enumrating all hypothesis explixitely. Instead we start with the maximally general and specific boundaries (G, S) and iteratively specilize G and generalize S.

```python
intialize G to be the maximally general hypotheses in H
intialize S to be the maximally specific hypotheses in H
for each training example d do:
    if d is a positive example then:
        remove from G any hypothesis inconsistent with d
        for each hypothesis s in S do:
            if s is inconsistent with d then:
                remove s from S
                Add to S all minimal generalizations h of s such that
                    1. h is consistent with d
                    2. some member of G is more general than h
                remove from S any hypothesis that is more general than another hypothesis in S
    elif d is a negative example:
        remove from S any hypothesis inconsistent with d
        for each hypothesis g in G do:
            if g is inconsistent with d then:
                remove g from G
                Add to G all minimal specialzations h of g such that
                    1. h is consistent with d
                    2. some member of S is more specific than h
                remove from G any hypothesis that is less general than another hypothesis in G
```

The size of the remaining version space reflects the amount of missing information. The version space can be consulted to select the most informative examples by slecting from a given set or active acquisition. If a correct hypothesis exist S and G will converge.

### Inductive Bias
A bias-free learning system makes no a priori assumptions about the structure of the world. Thus it can merely collect the examples and will be unable to generalize. It is important to know where the inductive bias is employed in our learner.\
Formal definition:
- Training set $D_c = \{<x, x(x)>\}$ for target concept c
- Learning system L. After training on $D_c$, $L$ yields the classification $L(x_i, D_c)$ for an unknown instance $x_i$. Notation: $D_c  \wedge x_i \succ L(x_i, D_c)$ where $a \succ b$ denotes b is *inductively inferred* from a
- The inductive bias of L is any minimal set of assertions B such that $\forall x_i \in X: B \wedge D_c \wedge x_i \models L(x_i, D_c)$ where $a \models b$ denotes b is *deductively inferred* from (or logically entailed by) a.