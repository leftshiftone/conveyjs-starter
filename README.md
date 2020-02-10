# conveyjs-starter

## Creating a new project

It is generally recommended to keep track of changes when cloning this repository in order to be able to pull updates.

### From template repository
 - Visit the [conveyjs-starter](https://github.com/leftshiftone/conveyjs-starter/generate) repository
 - Enter a Repository name
 - Click **Create repository from template**
 - Clone the created repository
 
### Custom with tracked origin
 - Initialize a new repository `git init my-project`
 - Add this repository as an remote `git remote add starter git@github.com:leftshiftone/conveyjs-starter.git`
 - List remotes `git remote -v`
 - Pull this repository for changes `git pull starter master`
 
## First run
 - Run `yarn -i` inside the newly cloned repository
 - Run `yarn test:unit` (should pass)
 - Run `yarn dev` to start the application
 - Visit [the application](http://localhost:3000/)
 - After page loaded up, run `yarn test:e2e`
 
After all tests are green, you are good to go!
