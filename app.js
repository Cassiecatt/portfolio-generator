const fs = require("fs");
const generatePage = require("./src/page-template.js");

const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      validate: (githubUsername) => {
        if (githubUsername) {
          return true;
        } else {
          console.log("Please enter your GitHub username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        "Would you like to enter some information about yourself for an 'About Me' section?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => confirmAbout,
    },
  ]);
};

//promptUser().then(answers => console.log(answers));

const promptProject = (portfolioData) => {
  console.log(`
  =================
  Add a New Project
  =================
  `);
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project? (Required)",
        validate: (projectInput) => {
          if (projectInput) {
            return true;
          } else {
            console.log("Please enter your project's name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (projectDesc) => {
          if (projectDesc) {
            return true;
          } else {
            console.log("Please enter a description of the project!");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project. (Required)",
        validate: (githubLink) => {
          if (githubLink) {
            return true;
          } else {
            console.log("Please enter your GitHub link!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
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
  .then((portfolioData) => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile("./index.html", pageHTML, (err) => {
      if (err) throw new Error(err);

      console.log(
        "Page created! Check out index.html in this directory to see it!"
      );
    });
  });

// const profileDataArgs = process.argv.slice(2);

// // Same as - const name = profileDataArgs[0]; & const github = profileDataArgs[1];
// const [name, github] = profileDataArgs;
