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
