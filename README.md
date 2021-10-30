# semantic-java

This is a sample java project to demonstrate the usage of [semantic-release](https://semantic-release.gitbook.io/) on a typical java maven project.
The main files are .github/workflows/release.yml and .releaserc

.github/workflows/release.yml is the github action to run the CI, so that on every push or pull request to the master branch, the CI job will spin up a virtual machine on the latest-ubuntu image.
Then the following jobs will be executed in the exact sequence.

1. Checkout this project from github
2. Set up java 11 in the VM
3. Set up nodeJs
4. Run maven build
5. Npm install semantic-release, together with the git plugin and changelog plugin
5. execute semantic-release with npx

It also creates the environment variable named GH_TOKEN, to be filled with the value from the project secret variable named GH_TOKEN.
For this, navigate to Settings > Secrets and create a repository secret named GH_TOKEN and fill it with the personal access token.

Execution of semantic-release will determine if a new version number is required, and if so, create a new release version.

.releaserc configures the semantic-release to run on the master branch only, and replace the default semantic-release plugins with

1. commit-analyzer
2. release-notes-generator
3. changelog
4. git
5. github
