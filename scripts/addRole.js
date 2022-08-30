const db = require("../config/connection");
const inquirer = require("inquirer");

async function addRole() {
  try {
    const [department] = await db.promise().query("SELECT * FROM departments");
    const departChoices = department.map((dep) => {
      return {
        name: dep.name,
        value: dep.department_id,
      };
    });

    const { title, salary, department_id } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter Role's Title:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter Role's Salary:",
      },
      {
        type: "list",
        name: "department_id",
        message: "Enter Role's Department:",
        choices: departChoices,
      },
    ]);
    await db
      .promise()
      .query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        [title, salary, department_id]
      );
    return `${role_title} has been added to the database`;
  } catch (err) {
    console.log(`Something went wrong!`, err);
  }
}

module.exports = addRole;