---
layout: post
title: Machine Learning - Basics of Data Mining
---


### Data Preprocessing
There are several problems which make data preprocessing necessary.
1. Data Format\
    This can be very difficult as data representation can differ stronly and conversion between different representations can not be generalized but has to be solved problem specific
2. Outliers and Missing Values

#### Outliers
The problem is that outliers can spoil our statisitcs. Taking the mean of a small dataset with extreme outliers will lead to a strong shift --> consider replacing the mean by the median.

Causes for outliers:
1. Technical errors / errors by measurement
2. Unexpected "true" effect
3. data with high variation - outliers are a natural part of the distribution

##### Outlier detection
When an outlier was detected, we can either remove it or we replace it. To detect an outlier first we have to define what is regular. Most often we assume the data to be normally distributed. For multivariate data, we can first cluster the data and then assume a normal distribution for each cluster.

**z-test**\
Outliers of univariate distributions can be detected from **z**-values: $z_i = |x_i - \mu| / \sigma$. Here $z_i$ is a measure of the distance of $x_i$ from the mean $\mu$ in terms of the standart deviation $\sigma$. Commonly, datapoints with $z_i > 3$ are considered outliers.

Improvement:\
Use the median instead of the mean to counter the outliers influence and increase the treshold to 3.5!

**Rosner test**\
The idea is to iteratively remove outliers until z-testing doesn't result in any more outliers.
```python
while True:
    calculate mean or median and standart deviation
    find data-point x_i with largest z_i
    if z_i is an outlier:
        remove x_i
    else:
        break
```

Once we detected our outliers we have to handle them. One option is to simply *remove* them. This results in information loss and therefore we should consider to *replace* or *weight* the outliers instead.

#### Missing values
Missing values pose a major problem as they can make most of our data unusable if no measure is taken.

Imagine that a datapoint consists of 100 elements. If the probability that a value is missing is $p=2\%$ then the probability that the vector is complete and therefore usable is $(1 - p)^{100} = 13\%$. If we don't do anything we wont be able to use $87\%$ of the data!

**Idea 1**
Replace missing values by the mean or median from the rest of the data set.

**Idea 2**
Estimate a model to predict missing values, f.e. linear regression.

$y' = y_s x + y_{0}$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $x' = x_s y + x_{0}$\
$y_s = C_{xy}/C_{xx}$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $x_s = C_{xy}/C_{yy}$\
$y_0 = \mu_y - y_s\mu_x$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $x_0 = \mu_x - x_s\mu_y$

$C_{xy}$ is the covariance of x and y and is $C_{xy} = \sum_{i=1...n}(x_i - \mu_x)*(y_i - \mu_y)$

<div id="linear_regression_sketch" style="position: relative;">
<script language="javascript" type="text/javascript" src="/post_content/machine_learning/scripts/linear_regression.js"></script>
</div>

**Idea 3**
EM alogorithm...
