const fs = require('fs');

const mysql = require('mysql2/promise');
const { viewDepartmentsQuery, viewRolesQuery, viewEmployeesQuery, addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery } = require('./queries');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: 'password',
  // database: 'employee_database_db',
});

async function executeQuery(query, params) {
    const [rows] = await connection.execute(query, params);
    return rows;
}
async function initializeDatabase() {
  try {
    // Read and execute the schema.sql file
    const schemaSql = fs.readFileSync('schema.sql', 'utf8');
    await connection.execute(schemaSql);

    // Read and execute the seeds.sql file
    const seedsSql = fs.readFileSync('seeds.sql', 'utf8');
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
    //Ask user for information
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

async function addEmployee() {
  try {
    //Ask user for employee information
    const employeeInfo = await inquirer.prompt([
      { type: 'input', name: 'firstName', message: 'Enter the first name of the employee:' },
      { type: 'input', name: 'lastName', message: 'Enter the last name of the employee:' },
      { type: 'input', name: 'roleId', message: 'Enter the role ID for the employee:' },
      { type: 'input', name: 'managerId', message: 'Enter the manager ID for the employee (optional):' },
    ]);

    // Execute the addEmployeeQuery with user-provided information
    await executeQuery(addEmployeeQuery, [
      employeeInfo.firstName,
      employeeInfo.lastName,
      employeeInfo.roleId,
      employeeInfo.managerId || null, // If managerId is not provided, set it to null
    ]);

    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

async function updateEmployeeRole() {
  try {
    // Get a list of employees for the user to choose from
    const employees = await executeQuery('SELECT employee_id, CONCAT(first_name, " ", last_name) AS employee_name FROM employees');
    
    // Prompt user to select an employee to update
    const selectedEmployee = await inquirer.prompt({
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee to update their role:',
      choices: employees.map((employee) => ({ name: employee.employee_name, value: employee.employee_id })),
    });

    //New ID from user
    const newRoleId = await inquirer.prompt({ type: 'input', name: 'newRoleId', message: 'Enter the new role ID for the employee:' });

    // Execute the updateEmployeeRoleQuery with user-provided information
    await executeQuery(updateEmployeeRoleQuery, [newRoleId.newRoleId, selectedEmployee.employeeId]);

    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}
  

  
module.exports = { initializeDatabase,viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole  };