
const db = require("../config/connection");
const inquirer = require("inquirer");

async function addDepartment() {
  try {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter Department Name:",
      },
    ]);
    // Add Department
    await db
      .promise()
      .query(`INSERT INTO department (name) VALUES (?)`, [
        name,
      ]);
    return `${name} has been added to the database`;
  } catch (err) {
    console.log(`Something went wrong!`, err);
  }
}

module.exports = addDepartment;