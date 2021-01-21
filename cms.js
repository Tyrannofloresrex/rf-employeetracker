const inquirer = require("inquirer");

const mySQL = require("mysql");

var connection = mySQL.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeetracker_db",
});