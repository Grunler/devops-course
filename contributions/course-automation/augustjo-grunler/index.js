const core = require('@actions/core');
const github = require('@actions/github');
var atob = require('atob');


async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    const token = core.getInput('repo-token');
    const minimalWordCountLimit = core.getInput('minimal-wordcount')
    const remarkableWordCountLimit = core.getInput('remarkable-wordcount')
    const deadline = new Date(core.getInput('deadline'))
    const octokit = github.getOctokit(token);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    //console.log(`The event payload: ${payload}`);
    // extract required information from payload from github
    const owner = github.context.payload.repository.owner.login;
    console.log(`The owner of the repo is ${owner}`)
    const branch = github.context.payload.pull_request.head.ref
    console.log(`the branch is: ${branch}`)
    var issue_number = github.context.payload.pull_request._links.issue.href.split("/")
    issue_number = issue_number[issue_number.length-1]
    const repoName = github.context.repo.repo
    console.log(`Pull request to: ${repoName}`)
    let timeOfSubmission = github.context.payload.pull_request.head.repo.pushed_at
    timeOfSubmission = new Date(timeOfSubmission)

    // get changed files from pullrequest
    var files = await getChangedfiles(owner, repoName, issue_number, octokit)
    files = files.filter(file => file.filename.includes('README.md'))
    files = files.filter(file => file.filename.includes('feedback'))
    console.log(files)
    let dir = files[0].filename.split('/')
    const reducer = (accumulator, word) => accumulator + "/" + word;
    dir.pop()
    dir = dir.reduce(reducer)
    console.log(dir)
  
    // Extract The readme file with the feedback from the correct directory
    var file = await getReadme(octokit,owner,repoName,dir,branch)
    const path = file.path
    console.log(`path is: ${path}`)
    core.setOutput("readme_path", path)
    var rawText = atob(file.content)
    console.log(`This is the rawtext of the readme: ${rawText}`)
    //get wordcount of feedback
    var wordCount = getMDwordCount(rawText)
    var wordCountReached = getWordCountVerdict(wordCount,minimalWordCountLimit,remarkableWordCountLimit)

  
    //build comment body
    var comment = createCommentBody(file.name, wordCount, wordCountReached, timeOfSubmission, deadline)
    buildAndPostComment(issue_number,comment, octokit)

    changed_files = github.context.payload.pull_request.changed_files;
    core.setOutput('changed_files', changed_files); 
  } catch (error) {
    core.setFailed(error.message);
  } 
}

function getMDwordCount(string) {
  str = string.replace(/([#\*>\+|/_@±/\[\]\\{}<±\-`]+)/g,"");
  console.log(`String after first replace: ${str} `);
  str = str.replace(/(\s)+/g," ");
  str = str.trim();
  console.log(`String: ${str} `);
  return str.split(" ").length;
}

// this function gets all the changed files in a pullrequest
var getChangedfiles = async function(owner,repo,issue_number,octokit) {
  return new Promise((resolve,reject) => {octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
    owner: owner,
    repo: repo,
    pull_number: issue_number
  }).then(files => {
    resolve(files.data)
  }).catch(err =>{
    console.log(err)
    reject(err)
  })
})
}

// this function fetches a readme in a specific directory on github
var getReadme = async function(octokit, owner, repo, dir, callingBranch='master') {
  return new Promise((resolve,reject) => {octokit.request('GET /repos/{owner}/{repo}/readme/{dir}', {
    owner: owner,
    repo: repo,
    dir: dir,
    ref: callingBranch
  }).then(file =>{ 
    x = atob(file.data.content)
    resolve(file.data)
  }).catch(err => {
    console.log(err)
  }) 
  })
 
}

function checkDeadline(deadline, timeOfSubmission) {
  if (deadline > timeOfSubmission) {
    return true
  } else {
    return false
  }
}

function getWordCountVerdict(wordCount, acceptableLimit, remarkableLimit) {
  let wc = parseInt(wordCount);
  let verdict = (wc < acceptableLimit) ? 'no': (wc >= remarkableLimit ? 'yes, remarkable' : 'yes');
  return verdict;
}

//TODO: add time aspect
function createCommentBody(filename, wc, verdict, timeApproved, timeOfSubmission, deadline ) {
  let comment = 'Checking wordcount and time of submission for feedback given';
  let fileString = `File checked: ${filename}. \n`;
  let wordCountString = `Feedback is substantiated: ${verdict} (${wc} words) \n`;
  //check time of submission
  let timeApproved = checkDeadline(deadline,timeOfSubmission)
  let timeCheckString = timeApproved? `The submission is delivered before the deadline \n` : `the submission is delivered after the deadline\n`
  comment = comment + fileString + wordCountString +  timeCheckString;
  return comment;
}

async function buildAndPostComment(issue_number, message, octokit) {
  const comment = await octokit.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number,
    body: message,
  });
}

// run main function
main()
