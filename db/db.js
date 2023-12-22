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
async function addRole() {
  try {
    // Prompt user for role information
    const roleInfo = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Enter the title of the role:' },
      { type: 'input', name: 'salary', message: 'Enter the salary for the role:' },
      { type: 'input', name: 'departmentId', message: 'Enter the department ID for the role:' },
    ]);

    // Execute the addRoleQuery with user-provided information
    await executeQuery(addRoleQuery, [roleInfo.title, roleInfo.salary, roleInfo.departmentId]);

    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

  
  // Similar functions for addRole, addEmployee, and updateEmployeeRole
  
  module.exports = { initializeDatabase,viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole  };