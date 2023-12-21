const fs = require('fs');

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
async function initializeDatabase() {
  try {
    // Read and execute the schema.sql file
    const schemaSql = fs.readFileSync('./path/to/schema.sql', 'utf8');
    await connection.execute(schemaSql);

    // Read and execute the seeds.sql file
    const seedsSql = fs.readFileSync('./path/to/seeds.sql', 'utf8');
    await connection.execute(seedsSql);

    console.log('Schema and seeds executed successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1); // Exit the application on error
  }
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
  
  module.exports = { initializeDatabase,viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole  };