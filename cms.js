const inquirer = require("inquirer");

const mySQL = require("mysql");

var connection = mySQL.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeetracker_db",
});

function mainPrompt() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "mainMenu",
          message: "Welcome to the Employee Database. What would you like to do?",
          choices: [
            "Add",
            "View",
            "Update",
            "Delete",
            "Exit",
          ],
        },
      ])
      .then(function (choices) {
        switch (choices.mainMenu) {
          case "Add":
            addOptions();
            break;
          case "View":
            viewOptions();
            break;
          case "Update":
            updateOptions();
            break;
            
          case "Delete":
            deleteOptions();
            break;
          
          default:
            connection.end();
            break;
        }
     });
 }

 function addOptions(){
     inquirer
     .prompt ([
        {
         type:"list",
         name: "add_menu",
         message: "What would you like to add to this database?",
         choices: [
             "Add Department",
             "Add Role",
             "Add Employee",
             "Return to Main Menu"
         ],
        },
    ]) .then (function (choices) {
        switch (choices.add_menu) {
            case "Add Department":
            departmentAdd();
            break;

            case "Add Role":

            break;

            case "Add Employee":
            
            break;

            case "Return to Main Menu":
            mainPrompt()
            break;
        }
    }
)}

function viewOptions(){
    inquirer
    .prompt ([
       {
        type:"list",
        name: "view_menu",
        message: "What would you like to view on this database?",
        choices: [
            "View Department",
            "View Role",
            "View Employee",
            "View Employee by Manager",
            "View Department Budget",
            "Return to Main Menu"
        ],
       },
   ]) .then (function (choices) {
       switch (choices.view_menu) {
           case "View Department":

           break;

           case "View  Role":

           break;

           case "View Employee":
           
           break;

           case "View Employee by Manager":
           
           break;

           case "View Department Budget":
            
           break;

           case "Return to Main Menu":
           mainPrompt()
           break;
       }
   }
)}

function updateOptions(){
    inquirer
    .prompt ([
       {
        type:"list",
        name: "update_menu",
        message: "What would you like to update on this database?",
        choices: [
            "Update Role",
            "Update Manager",
            "Return to Main Menu"
        ],
       },
   ]) .then (function (choices) {
       switch (choices.view_menu) {
           case "Update Role":

           break;

           case "Update Manager":
           
           break;

           case "Return to Main Menu":
           mainPrompt()
           break;
       }
   }
)}

function deleteOptions(){
    inquirer
    .prompt ([
       {
        type:"list",
        name: "delete_menu",
        message: "What would you like to delete from this database?",
        choices: [
            "Delete Role",
            "Delete Manager",
            "Return to Main Menu"
        ],
       },
   ]) .then (function (choices) {
       switch (choices.view_menu) {
           
        case "Delete Department":
           
        break;
        
        case "Delete Role":

        break;

        case "Delete Employee":
        
        break;

        case "Return to Main Menu":
        mainPrompt()
        break;
       }
   }
)}

function departmentAdd() {
    inquirer
    .prompt([
        {
     type: "input",
     name: "dept_name",
     message: "What is the name of this new department?"
        }
    ]).then(function(ans) {
    var sql= "INSERT INTO departments (name) VALUES ?"
    let dept_name = ans.name
        connection.query(sql, dept_name), function(err, result) {  
            if (err) throw err;  
            console.log(result.name + "added to database");  
        }
    })
}

function employeeAdd(){
    inquirer.prompt([
        {
            type: "input",
            name: "last_name",
            message: "What is the new employee's last name?"
        },
        {
            type: "input",
            name: "first_name",
            message: "What is the new employee's first name?"  
        },
        {
            type: "confirm",
            name: "mgmt_status",
            message: "Is this employee a manager?" 
        }
    ]).then (function(ans) {
        if (ans.mgmt_status===true){
            inquirer
            .prompt([
                {
                    type: "list",
                    name: "mngr_dept",
                    message: "What department does this person manage?"
                    // choices: TODO:populate choices with options from database
                }
            ]).then(function())
        } else {
            inquirer.prompt ([
                {
                    type:"list",
                    name: "role",
                    message: "What is this employee's role within the company?"
                    // choices: TODO:populate choices with options from database
                },
                {
                    type: "list",
                    name: "dept",
                    message: "What department does this employee work in?"
                    // choices: TODO:populate choices with options from database

                },
            ]).then()
        }
    }
    )
}