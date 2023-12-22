// Import required modules
// const inquirer = require('inquirer');
// const mysql = require('mysql2');

const inquirer = require('inquirer');
const { initializeDatabase, viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db/db');

async function startApp() {
  await initializeDatabase();
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            console.log('Exiting the application.');
            process.exit();
        }
      });
  }
  
  startApp();