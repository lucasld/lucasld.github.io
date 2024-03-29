---
layout: post
title: Machine Learning
concept-learning:
    -
        name: "find-s-algorithm"
        name_value: "Find-S Algorithm"
    -
        name: "version-space"
        name_value: "Version Space"
    -
        name: "list-then-eliminate-algorithm"
        name_value: "List-Then-Eliminate Algorithm"
    -
        name: "representing-version-spaces"
        name_value: "Representing Version Spaces"
    -
        name: "candiate-elimination-algorithm"
        name_value: "Candiate-Elimination algorithm"
    -
        name: "inductive-bias"
        name_value: "Inductive Bias"

decision-trees:
    -
        name: "when-to-consider-decision-trees"
        name_value: "When to consider decision trees"
    -
        name: "top-down-induction-of-decision-trees"
        name_value: "Top-down induction of decision trees"
    -
        name: "entropy-and-information-gain"
        name_value: "Entropy and Information Gain"
    -
        name: "id3"
        name_value: "ID3"
    -
        name: "extensions-of-id3"
        name_value: "Extensions of ID3"
basics-of-dm:
    -
        name: "outliers"
        name_value: "Outliers"
    -
        name: "missing-values"
        name_value: "Missing Value"
    -
        name: "distance-function"
        name_value: "Distance Function"
clustering:
    -
        name: "distance-measures"
        name_value: "Distance Measures"
    -
        name: "bias-in-clustering"
        name_value: "Bias in clustering"
    -
        name: "hierachical-clustering"
        name_value: "Hierachical clustering"
    -
        name: "optimization-based-clustering"
        name_value: "Optimization based clustering"
    -
        name: "compression-by-clustering"
        name_value: "Compression by clustering"
    -
        name: "k-means-clustering"
        name_value: "K-means clustering"
    -
        name: "soft-clustering"
        name_value: "Soft clustering"
    -
        name: "conceptual-clustering-cobweb"
        name_value: "Conceptual clustering: Cobweb"
dimension-reduction:
    -
        name: "curse-of-dimensionality"
        name_value: "Curse of dimensionality"
    -
        name: "principal-component-analysis"
        name_value: "Principal component analysis"
    -
        name: "principal-curves"
        name_value: "Principal curves"
    -
        name: "visualization-of-high-dimensional-data"
        name_value: "Visualization of high dimensional data"

neural-networks:
    -
        name: "computer-vs-brain"
        name_value: "Computer vs. brain"
    -
        name: "types-of-learning"
        name_value: "Types of learning"
    -
        name: "hebbian-learning"
        name_value: "Hebbian learning"
    -
        name: "perceptron"
        name_value: "Perceptron"
    -
        name: "multilayer-perceptron"
        name_value: "Multilayer Perceptron"
    -
        name: "neural-architectures"
        name_value: "Neural architectures"

local-methods:
    -
        name: "instance-based-learning"
        name_value: "Instance-based learning"
    -
        name: "radial-basis-functions"
        name_value: "Radial basis functions"
    -
        name: "self-organizing-maps"
        name_value: "Self-organizing maps"
classification:
    -
        name: "bayes-classifier"
        name_value: "Bayes classifier"
    -
        name: "euclidean-classifier"
        name_value: "Euclidean classifier"
    -
        name: "support-vector-machine"
        name_value: "Support vector machine"
    -
        name: "random-forests"
        name_value: "Random forests"
reinforcement-learning:
    -
        name: "weak-teacher"
        name_value: "Weak teacher"
    -
        name: "markow-decision-process"
        name_value: "Markov decision process"
    -
        name: "learning-task"
        name_value: "Learning task"
    -
        name: "horizon"
        name_value: "Horizon"
    -
        name: "learning"
        name_value: "Learning"
    -
        name: "q-function"
        name_value: "Q function"
    -
        name: "summary"
        name_value: "Summary"
---

Here I write about some techniques to make machines learn from data.


### Topics:
- [Concept Learning]({{ site.baseurl }}{% link post_content/machine_learning/concept-learning.md %})
    {% for subchapter in page.concept-learning %}
    - <a href="{{ site.baseurl }}{% link post_content/machine_learning/concept-learning.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Decision Trees]({{ site.baseurl }}{% link post_content/machine_learning/decision-trees.md %})
    {% for subchapter in page.decision-trees %}
    * <a href="{{ site.baseurl }}{% link post_content/machine_learning/decision-trees.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Basics of Data Mining]({{ site.baseurl }}{% link post_content/machine_learning/basics-of-dm.md %})
    {% for subchapter in page.basics-of-dm %}
    * <a href="{{ site.baseurl }}{% link post_content/machine_learning/basics-of-dm.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Clustering]({{ site.baseurl }}{% link post_content/machine_learning/clustering.md %})
    {% for subchapter in page.clustering %}
    * <a href="{{ site.baseurl }}{% link post_content/machine_learning/clustering.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Dimensionality Reduction]({{ site.baseurl }}{% link post_content/machine_learning/dimension-reduction.md %})
    {% for subchapter in page.dimension-reduction %}
    * <a href="{{ site.baseurl }}{% link post_content/machine_learning/dimension-reduction.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Neural Networks]({{ site.baseurl }}{% link post_content/machine_learning/neural-networks.md %})
    {% for subchapter in page.neural-networks %}
    * <a href="{{ site.baseurl }}{% link post_content/machine_learning/neural-networks.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Local Methods]({{ site.baseurl }}{% link post_content/machine_learning/local-methods.md %})
    {% for subchapter in page.local-methods %}
    * <a href="{{ site.baseurl }}{% link post_content/machine_learning/local-methods.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Classification]({{ site.baseurl }}{% link post_content/machine_learning/classification.md %})
    {% for subchapter in page.classification %}
    * <a href="{{ site.baseurl }}{% link post_content/machine_learning/classification.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Reinforcement Learning]({{ site.baseurl }}{% link post_content/machine_learning/reinforcement-learning.md %})
- [Modelling Unvertainty]({{ site.baseurl }}{% link post_content/machine_learning/modelling-uncertainty.md %})
