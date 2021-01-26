const inquirer = require("inquirer");

// const mySQL = require("mysql");
const jsQuery = require ("./query.js");


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
};



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
            roleAdd();
            break;

            case "Add Employee":
            employeeAdd();
            break;

            case "Return to Main Menu":
            mainPrompt()
            break;
        }
    }
)};

function viewOptions(){
    inquirer
    .prompt ([
       {
        type:"list",
        name: "view_menu",
        message: "What would you like to view on this database?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "View Employee by Manager",
            "View Department Budget",
            "Return to Main Menu"
        ],
       },
   ]) .then (function (choices) {
       switch (choices.view_menu) {
           case "View Departments":
            jsQuery.viewData("departments");
            mainPrompt();
           break;

           case "View Roles":
            jsQuery.viewData("roles");
            mainPrompt();
           break;

           case "View Employees":
            jsQuery.viewData("employees");
            mainPrompt();
           break;

        //    case "View Employee by Manager":
           
        //    break;

        //    case "View Department Budget":
            
        //    break;

           case "Return to Main Menu":
           mainPrompt();
           break;
       }
   }
)};

function updateOptions(){
    inquirer
    .prompt ([
       {
        type:"list",
        name: "update_menu",
        message: "How would you like to update this database?",
        choices: [
            "Update Role",
            "Update Manager",
            "Return to Main Menu"
        ],
       },
   ]) .then (function (choices) {
       switch (choices.view_menu) {
           case "Update Role":
                roleUpdate();
           break;

        //    case "Update Manager":
           
        //    break;

           case "Return to Main Menu":
           mainPrompt()
           break;
       }
   }
)};

function deleteOptions(){
    inquirer
    .prompt ([
       {
        type:"list",
        name: "delete_menu",
        message: "What would you like to delete from this database?",
        choices: [
            "Delete Department",
            "Delete Role",
            "Delete Employee",
            "Return to Main Menu"
        ],
       },
   ]) .then (function (choices) {
       switch (choices.delete_menu) {
           
        case "Delete Department":
           deptDelete();
        break;
        
        case "Delete Role":
            roleDelete();
        break;

        case "Delete Employee":
            employeeDelete();
        break;

        case "Return to Main Menu":
        mainPrompt()
        break;
       }
   }
)};
async function deptDelete(){
    console.log("in")
    let departments = await jsQuery.selectData("departments", "*")
    const deptChoices = departments.map(function (department) {
        console.log("departments")
        return department.dept_name
    })
    
    inquirer
    .prompt ([
        {
            type:"list",
            name:"del_dept",
           message: "Which department would you like to delete?",
           choices: deptChoices
        }
    ]).then(function(ans){
        console.log("made it")
        jsQuery.deleteFrom("departments", {dept_name: ans.del_dept})
        console.log(ans.del_dept)
        mainPrompt();
    })
}

async function roleDelete(){
    let roles = await jsQuery.selectData("roles", "*")
    const roleChoices = roles.map(function(role) {
        return role.title
    })
    inquirer
    .prompt ([
        {
            type:"list",
            name:"del_role",
           message: "Which role would you like to delete?",
           choices: roleChoices
        }
    ]).then(function(ans){
        jsQuery.deleteFrom("roles",{title: ans.del_role})
        console.log(ans.del_role)
        mainPrompt();
    })
}
async function employeeDelete(){
    let employees = await jsQuery.selectData("employees", "*")
    const employeeChoices = employees.map(function(employee) {
        return employee.first_name +" "+ employee.last_name
    })
    inquirer
    .prompt ([
        {
            type:"list",
            name:"del_employee",
           message: "Which employee would you like to delete?",
           choices: employeeChoices
        }
    ]).then(function(ans){
        let selectedEmployee = employees.filter(employee=> ans.del_employee==employee.first_name +" "+ employee.last_name)[0]
        console.log(selectedEmployee)
        jsQuery.deleteFrom("employees", {id: selectedEmployee.id})
        console.log(ans.del_employee)
        mainPrompt();
    })
}
async function roleUpdate(){
    let employees= await jsQuery.selectData("employees", "*")
    let roles = await jsQuery.selectData("roles", "*")
    const employeeChoices = employees.map(function (emplyee){
        return employee.first_name + employee.last_name
    })
    const roleChoices = roles.map(function(role) {
        return role.title
    })
    console.log(employeeChoices)
    console.log(roleChoices)
    inquirer
    .prompt([
        {
        type: "list",
        name: "name",
        message: "Whose role would you like to update?",
        choices: employeeChoices
        },
        {
            type: "input",
            name: "new_role",
            message: "What is this employee's new role?",
            choices: roleChoices
        }
        .then (function(ans) {
        jsQuery.updateData("roles", {name: ans.name, title: ans.new_role})
        mainPrompt();
        })
    ])
}
// function managerUpdate(){
//     inquirer
//     .prompt([
//         {
//         type: "list",
//         name: "old_name",
//         message: "Which employee would you like to update?",
//         choices:
//         },
//         {
//             type: "input",
//             name: "new_name",
//             message: "What department is this employee moving to?",
//         }.then (function(ans) {
//         jsQuery.updateData("departments", ans.new_name)
//         mainPrompt();
//         })
//     ])
// }
function departmentAdd() {
    inquirer
    .prompt([
        {
     type: "input",
     name: "dept_name",
     message: "What is the name of this new department?"
        }
        ]).then(function(ans) {
        
        jsQuery.addTo("departments", ans)
        console.log(ans + "this was")
        mainPrompt();
    });
};
function roleAdd() {
    inquirer
    .prompt([
        {
        type: "input",
        name: "title",
        message: "What is the name of the new role you would like to add?"
        },
        {
            type: "number",
            name: "salary",
            message: "What is the salary for this new role? (pick a positive number up to 100000)"
            }
    ]).then(function(ans){
        jsQuery.addTo("roles", ans)
        mainPrompt()
    })
};
async function employeeAdd() {
    let departments = await jsQuery.selectData("departments", "*")
    let roles = await jsQuery.selectData("roles", "*")
    const deptChoices = departments.map(function (department){
        return department.dept_name
    })
    const roleChoices = roles.map(function(role) {
        return role.title
    })
    console.log(departments)
    console.log(roleChoices)
    inquirer
    .prompt([
        {
            type: "list",
            name: "dept",
            message: "What department does this new employee work in?",
            choices: deptChoices
        },
        {
            type:"list",
            name: "role",
            message: "What is this employee's role within the company?",
            choices: roleChoices
        },
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
    ]).then(function(info) {
        if (info.role === "Manager"){

        }
        jsQuery.addTo("employees", info)
        mainPrompt()
    })              
};


mainPrompt()