---
layout: post
title: Machine Learning - Reinforcement Learning
---
In reinforcement learning we have an **agent** within an **environement**. The agent can perceive a **state** of the environment and can perform some **actions** that change the agents state in the environment. The goal is to find the optimal actions to reach some goal.

The agent is defined by "*PEAS*".
1. *P*erformance
2. *E*nvironment
3. *A*ctuators
4. *S*ensors

Robot manipulates objects on a table:
1. *P*erformance: move object from one location to another
2. *E*nvironment: table with objects
3. *A*ctuators: motor current
4. *S*ensors: camera, tactile sensors, force sensors

Autonomous vehicle:
1. *P*erformance: trade of between reaching the goal fast and risking damage
2. *E*nvironment: the street with other participants of traffic
3. *A*ctuators: steering, gas pedal
4. *S*ensors: camera, GPS


### Weak teacher
- does not tell which action to choose in a certain situation explicitly
- instead, a **reward** is given when a certain action is performed in a certain state (negative reward = punishment)
- reward is **delayed** since the action is performed first, leading to a different state
- aim: maximize **cumulative reward** obtained over a sequence of actions
- rewards may be zero, i.e., no information is conveyed
- limit case: no rewards on the way, only at the final state. The agent has to infer a sequence of actions from the final reward only
- training: try to reach goal over and over with improving cumulative reward (a "playground" is provided)
- active exploration of states and actions may be useful


### Markov decision process
Restrict reinforcement learning to a **Markov decision process**:
- agent performs transitions between **discrete states** from a finite set $$S$$. So states can not have continuous parameterization, e.g., real values position
- this implies **discrete time** *t*
- the agent can choose one action at a time from a set of **discrete actions** *A*

At time $$t$$ the agent is in state $$s_t\in S$$ and chooses action $$a_t \in A$$ which leads to receiving a reward $$r_t \in R$$ and brings the agent into state $$s_{t+1}$$. Training examples have the form $$((s, a), r)$$ not $$(s,a)$$, i.e., information is conveyed by rewarding an action $$a$$ performed in state $$s$$, not by telling explicitly what action $$a$$ to take in state $$s$$.

#### Markov assumptions
- successor state depends only in current state and current action, not earlier ones: $$s_{t+1} = \delta(s_t, a_t)$$ (not $$s_{t+1} = \delta(s_t, s_{t-1}, ..., a_t, a_{t-1}, ...)$$) where $$\delta$$ is the successor funtion
- the same applies to the reward: $$r_t = r(s_t, a_t)$$ where $$r$$ is the reward function

The successor function $$\delta(s,a)$$ and the reward function $$r(s,a)$$ are most probably unkown to the agent and often non-deterministic.


### Learning task
Execute actions and observe the results to learn an **action policy**: $$\pi: S\rightarrow A$$ which yields for each state the action to be executed. To judge the success of the policy $$\pi$$, a function $$V$$ that values the obtained rewards is needed.

Naive approach for $$V$$: $$V^\pi(s_t) = r_t + r_{t+1} + r_{t+1} + ... = \sum_{t' = t...\infty}r_{t'}$$

Here the problem is that if the afent does not reach a final state, the value may be infinite.


### Horizon
One idea to solve the previous problem is to introtode a finite "**horizon**" after $$N$$ time steps: $$V^\pi(s_t) = \sum_{t' = t...N+t}r_{t'}$$.

Problems of a "hard horizon":
* choice of $$N$$ is diffiuclt
* best action depends on horizon $$N$$
* thus, the best action depends on time steps
* the optimal policy is not stationary

A better solution is a "soft horizon": $$V^\pi(s_t) = \sum_{t' = t...\infty}\gamma^{t'}r_{t'}$$ with the **discount factor** $$0 < \gamma < 1$$ for future rewards, i.e., rewards are less important the more they are in the future.


### Learning
The aim is to find the optimal policy $$\pi^*$$ that maximizes the evaluation function $$\forall s: \pi^* = argmax_\pi V^\pi(s)$$. The corresponding maximum value $$V^{\pi^*}$$ of the evaluation function is denoted by $$V^*$$.

We want to learn $$\pi^*: S\rightarrow A$$ but there are no training examples $$(s,a)$$, only $$((s,a), r)$$ so instead of learning best actions for given states, an evaluation function must be learned.

The idea is to learn the evaluation function $$V^*$$, because it tells that, e.g., a future state $$s$$ yields higher cumulative rewards than future state $$s': V^*(s) > V^*(s')$$. Since the agent can not choose among states but only among actions, it must infer the optimal action $$a^*$$ from $$V^*$$ by a look ahead search over all actions: $$a^*(s) = argmax_a[r(s,a) + \gamma V^*(\delta(s,a))]$$ but actions can not be chosen this way since the agent does not know:
- the successor function: $$\delta: SxA \rightarrow S$$
- the reward function: $$r: SxA \rightarrow R$$

In principle, $$\delta$$ and $$r$$ can be learned in advance (without searching for optimal actions yet) by a complete search over the state space.


### Q function
Define a new evaluation function: $$Q(s,a) = r(s,a) + \gamma V^*(\delta(s,a))$$. By learning $$Q$$ instead of $$V^*$$, the agent can choose optimal actions without knowing $$\delta$$: $$a^*(s) = argmax_a[r(s,a) + \gamma V^*(\delta(s,a))] = argmax_a Q(s,a)$$.

But $$Q$$ is based on $$\delta$$ and $$r$$, so where is the improvement? As the agent does not know $$\delta$$ and $$r$$ in advance, it must learn both from exploration. But it is not necessar to learn both explicitly (in seperation) and completely, it's easier to learn the quantity $$Q$$ instead.

#### Training rule for Q
Estimate training values for $$Q(s,a) = r(s,a) + \gamma V^*(\delta(s,a))$$ by iterative approximation (Watkins 1989). Since $$V^*(s) = max_a Q(s,a)$$, $$Q$$ can be expressed withoud $$V^*$$ recursively: $$Q(s,a) = r(s,a) + \gamma max_a Q(s,a)$$. The learners estimate of the true $$Q$$ will be denoted by $$q$$. The intial estimates $$q(s,a)$$ may be zero or random values. The update tule for the estimate is $$q(s,a) \leftarrow r + \gamma max_{a'}q(s', a')$$ where $$s'$$ is the state resulting from action $$a$$ in state $$s$$. It can be priven that q converges to $$Q$$.

```python
intitialize q-table of size |s|x|a| and set values to 0
s = current state
repeat:
    a = selected action a
    execute a
    receive reward r
    s_new = new observed state
    update q-table(s,a) = r + gamma * max(q-table(s_new,a’))
    s = s_new
```

#### Q-Learning
- when the agent moves forward from $$s$$ to $$s'$$, learning propagates the estimate backward from $$s'$$ to $$s$$, using the received reward $$r$$ to improve the estimation
- training proceeds in **episodes**: in each episode, the agent starts at some random state and acts until the (absorbing) goal state is reached
- since all rewards are $$0$$ except for transition to the gial state, the q-value will remain $$0$$ until the goal state has been reached for the first time
- then the non-zero reward for the goal transition will be propagated to the previous state
- thus the goal reward will gradually spread from the goal throughout the other states over the spisodes, refining q ever more
- convergence to $$Q$$ requires non-negative rewards
- simple strategy to choose actions: always choose action that maximizes $$q(s,a)$$
- problem: agent will prefer good "paths" that have been found in the beginning of the training. Other regions of the state-action space may be neglected
- alternative: probabilistic choice of actions, e.g., by choosing the next action according to the probability $$P(a_i\vert s)= k^{q(s, a_i)} / \sum_j k^{q(s,a_j)}$$ where $$k>0$$ is a constant that determines how strongly high q-values are favored.
- thus the agent can *explore* the state-action space

### Summary
* RL enables an agent to learn actions to reach a goal
* Q-learning is the most populat algorithm
* q-table may be replaced by better means, e.g., a neural network
* additional strategy for active exploration of state-action space necessary
* generalization to non-deterministic case possible
* numerous applications, e.g., in robotics or games