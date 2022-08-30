
const db = require("../config/connection");

async function viewAllEmployees() {
  try {
    const allEmployees = await db.promise()
      .query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, employees.manager_id 
    FROM ((employees 
    INNER JOIN roles ON employees.role_id = roles.role_id) 
    INNER JOIN departments ON roles.department_id = departments.department_id)`);
    return allEmployees;
  } catch (err) {
    console.log(`Something went wrong!`, err);
  }
}

module.exports = viewAllEmployees;