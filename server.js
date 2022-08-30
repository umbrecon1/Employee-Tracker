const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./config/connection");
const viewAllDepartments = require("./scripts/viewAllDepartments");
const viewAllEmployees = require("./scripts/viewAllEmployees");
const viewAllRoles = require("./scripts/viewAllRoles");
const addEmployee = require("./scripts/addEmployee");
const addDepartment = require("./scripts/addDepartment");
const addRole = require("./scripts/addRole");

// Refactor to async / await
async function userChoice() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Exit",
      ],
      message: "What would you like to do?",
    },
  ]);
  switch (choice) {
    case "View All Employees":
      const allEmployees = await viewAllEmployees();
      return userChoice();

    case "View All Departments":
      const allDepartments = await viewAllDepartments();
      return userChoice();

    case "View All Roles":
      const allRoles = await viewAllRoles();
      return userChoice();

    case "Add an Employee":
      const employee = await addEmployee();
      return userChoice();

    case "Add a Department":
      const department = await addDepartment();
      return userChoice();

    case "Add a Role":
      const role = await addRole();
      return userChoice();

    default:
      // Exit
      process.exit(1);
  }
}

// CLI Application Start
function init() {
  console.log("**************************************************************");
  console.log("*                                                            *");
  console.log("*                                                            *");
  console.log("*                       EMPLOYEE MENU                        *");
  console.log("*                                                            *");
  console.log("*                                                            *");
  console.log("**************************************************************");

  // Call function
  userChoice();
}
init();