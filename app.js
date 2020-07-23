// // const fs = require('fs');
// // const generatePage = require('./src/page-template.js');

// const profileDataArgs = process.argv.slice(2);

// // Same as - const name = profileDataArgs[0]; & const github = profileDataArgs[1];
// const [name, github] = profileDataArgs;

// // fs.writeFile('./index.html', generatePage(name, github), err => {
// //     if (err) throw new Error (err);

// //     console.log('Portfolio complete! Check out the index.html to see the output!');

// // });

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

// promptUser().then(answers => console.log(answers));

const promptProject = portfolioData => {
    portfolioData.projects = [];
    console.log(`
    =================
    Add a New Project
    =================
    `);
   // If there's no 'projects' array property, create one
if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a desription of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you do this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });  
};   
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });