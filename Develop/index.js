const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
    <div></div>
</body>
</html>`
writeFileAsync("index.html", html, "utf8")

async function promptUser() {


    let employee = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is your role?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your github?"
        }
    ]);
    console.log(employee)

    let name = JSON.stringify(employee.name);
    let role = JSON.stringify(employee.role);
    let id = JSON.stringify(employee.id);
    let email = JSON.stringify(employee.email);
    let github = JSON.stringify(employee.github);
    let path = employee.role

    try {


        //MAKE IT SO THAT IT WRITES A DIFFERENT HTML CARD DEPENDING ON ANSWER TO ROLE (instead of files have the html templates as variables)
        switch (path) {
            case "intern":
                //stuff here
                const intern = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${name}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
  <p class="card-text">ID: ${id}</p>
  <a href="#" class="card-link">${email}</a>
  <a href=${github} class="card-link">github</a>
</div>
</div>`
                fs.appendFile("index.html", intern, function (err) {
                    if (err) throw err;
                    console.log("dope")
                })

                console.log(employee.role)
                break;

            case "engineer":
                //stuff here
                const engineer = `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
              <p class="card-text">ID: ${id}</p>
              <a href="#" class="card-link">${email}</a>
              <a href=${github} class="card-link">github</a>
            </div>
            </div>`
                appendFileAsync("index.html", engineer, "utf8")

                console.log(employee.role)
                break;

            case "manager":
                //stuff here
                const manager = `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
              <p class="card-text">ID: ${id}</p>
              <a href="#" class="card-link">${email}</a>
              <a href=${github} class="card-link">github</a>
            </div>
            </div>`
                appendFileAsync("index.html", manager, "utf8")

                console.log(employee.role)
                break;

            default:
                console.log("wrong role")
        }



    } catch (err) {
        console.log(err)
    }
    let addAnother = await inquirer.prompt({
        type: "input",
        name: "continue",
        message: "would you like to add another employee?"
    });
    console.log(addAnother.continue)
    if (addAnother.continue === "yes") {
        promptUser();
    } else {
        console.log("finished")
    }
}
promptUser();
