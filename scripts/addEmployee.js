const db = require("../config/connection");
const inquirer = require("inquirer");

async function addEmployee() {
  try {
    const [manager] = await db
      .promise()
      .query("SELECT role_id, first_name, last_name FROM employee");
    const managerChoices = manager.map((man) => {
      return {
        name: `${man.first_name} ${man.last_name}`,
        value: man.id,
      };
    });

    const [roles] = await db
      .promise()
      .query(`SELECT department_id, title FROM role`);
    const choices = roles.map((role) => {
      return {
        name: role.title,
        value: role.department_id,
      };
    });
    const { first_name, last_name, role_id, manager_id } =
      await inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter Employee's First Name:",
        },
        {
          name: "last_name",
          message: "Enter Employee's Last Name:",
          type: "input",
        },
        {
          name: "role_id",
          message: "Select Employee's Title:",
          type: "list",
          choices,
        },
        {
          name: "manager_id",
          message: "Select Employee's Manager:",
          type: "list",
          choices: [...managerChoices, { name: "No Manager", value: null }],
        },
      ]);
    await db
      .promise()
      .query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [first_name, last_name, role_id, manager_id]
      );
    return `${first_name} ${last_name} has been added to the database`;
  } catch (err) {
    console.log(`Something went wrong!`, err);
  }
}

module.exports = addEmployee;