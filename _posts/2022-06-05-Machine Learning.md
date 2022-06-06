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
---

Here I write about some techniques to make machines learn from data.


### Topics:
- [Concept Learning]({{ site.baseurl }}{% link post_content/machine_learning/concept-learning.md %})
    {% for subchapter in page.concept-learning %}
    - <a href="{{ site.baseurl }}{% link post_content/machine_learning/concept-learning.md %}#{{subchapter.name}}">{{ subchapter.name_value }}</a>
    {% endfor %}
- [Decision Trees]({{ site.baseurl }}{% link post_content/machine_learning/decision-trees.md %})
- [Basics of Data Mining]({{ site.baseurl }}{% link post_content/machine_learning/basics-of-dm.md %})
- [Clustering]({{ site.baseurl }}{% link post_content/machine_learning/clustering.md %})
- [Dimensionality Reduction]({{ site.baseurl }}{% link post_content/machine_learning/dimension-reduction.md %})
- [Neural Networks]({{ site.baseurl }}{% link post_content/machine_learning/neural-networks.md %})
