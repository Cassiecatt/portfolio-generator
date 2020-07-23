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

inquirer
.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }
])
.then(answers => console.log(answers));