---
layout: post
title: Machine Learning - Concept Learning
---
Concept Learning is the seach in the space of hypotheses for the hypothesis best fitting the examples.\
Let's assume our target function is binary and each example/instance contains 5 binary attributes. In this case there are $$2^5 = 96$$ possible instances. How our hypothesis space looks like dependes on how we represent a hypothesis. We define our hypothesis to be a conjunction of constraints on the 5 attributes.\
Each constraint can be:
- a specific value, $$attribute1 = true$$
- value unimportant, e.g. $$attribute1 = ?$$
- no value allowed, e.g. $$attribute1 = \emptyset$$

As every attribute can either be false or true and additionaly may contain the values $$?$$ and $$\emptyset$$ there is $$4^5 = 1024$$ possible hypothesis.
....