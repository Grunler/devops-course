# Course automation: Check Feedback Requirements

## Members
August Jönsson: 

Github: Augustjon  
KTH.se: augustjo

Daniel Grünler:

Github: Grunler  
KTH.se: grunler

## Proposal:
We plan on making a Github action that automates part of the evaluation for the feedback task. 
This will include checks to see that the feedback exceeds the minimum word limit of 500 words, that it meets deadline requirements and that there are pointers to additional material.
We will also implement the possible checks for a remarkable submission, such as the feedback surpassing 1000 words or being submitted within 24 hours.

## Submissions

We have created a github action that can be used to automate some part of the evaluation of the feedback task. When people in the KTH course DevOps give feedback to their fellow students, That feedback has to pass certain requirements. We have focused on 2 of these requirements: 
1. The feedback is substasiated meaning that the wordcount is at least 500 words, and if the wordcount is above 1000 then the feedback is considerd remarkable. 
2. The feedback should be submited 4 days before the submission deadline of the task.

The action triggers when a pullrequest is made or synchronized and when the files that are modified matches this path in the devops structure `**/feedback/**/README.md`. 
This means that if someone adds their feedback in the README (which they should) of their folder in the feedback folder, this action will trigger and check the requirements. After the feedback is checked by the action the action will produce a pr comment on the person submiting feedback's pr stating weather the feedback is sufficient or not.

## Usage
### workflow file
To use the action create a file in your project (example `.github/workflows/feedbackcheck.yml`) and include these lines of code.
````yml
name: Feedback-check
on: 
  pull_request:
    paths:
      - '**/feedback/**/README.md'
jobs:
  action:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: check feedback
      id: feedback
      uses: ./contributions/course-automation/augustjo-grunler
      with:
        repo-token: ${{secrets.GITHUB_TOKEN}}
        minimal-wordcount: 500
        remarkable-wordcount: 1000
        deadline: '2021-04-31T23:59Z'
````
The inputs of the actions are:
| Name                | Description                                                                                                    | Required |
|---------------------|----------------------------------------------------------------------------------------------------------------|----------|
| Repo-token          | The token is necessary in order to make pr comments and get access to data from github                         | True     |
| minimal-wordcount   | The minimal wordcount required to pass the check                                                               | True     |
| remakable-wordcount | The wordcountlimit for whats considerd remarkable feedback                                                     | True     |
| deadline            | The deadline of tasks that you are able to submit feedback on. Can be changed depending on different deadlines on later course offerings. The format of the deadline should be ISO8601| True     |
