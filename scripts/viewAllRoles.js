
const db = require("../config/connection");

async function viewAllRoles() {
  try {
    const allRoles = await db.promise().query("SELECT * FROM roles");
    return allRoles;
  } catch (err) {
    console.log(`Something went wrong!`, err);
  }
}
// Export
module.exports = viewAllRoles;