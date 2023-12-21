const mysql = require('mysql2/promise');
const { viewDepartmentsQuery, viewRolesQuery, viewEmployeesQuery, addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery } = require('./queries');

const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

async function executeQuery(query, params) {
    const [rows] = await connection.execute(query, params);
    return rows;
  }
  
  async function viewDepartments() {
    const departments = await executeQuery(viewDepartmentsQuery);
    console.table(departments);
  }
  
  async function viewRoles() {
    const roles = await executeQuery(viewRolesQuery);
    console.table(roles);
  }
  
  async function viewEmployees() {
    const employees = await executeQuery(viewEmployeesQuery);
    console.table(employees);
  }
  
  async function addDepartment() {
    const departmentName = await inquirer.prompt({ type: 'input', name: 'name', message: 'Enter the name of the department:' });
    await executeQuery(addDepartmentQuery, [departmentName.name]);
    console.log('Department added successfully!');
  }
  
  // Similar functions for addRole, addEmployee, and updateEmployeeRole
  
  module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, /* addRole, addEmployee, updateEmployeeRole */ };