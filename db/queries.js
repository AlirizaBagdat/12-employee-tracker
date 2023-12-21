const viewDepartmentsQuery = 'SELECT * FROM departments';
const viewRolesQuery = 'SELECT * FROM roles';
const viewEmployeesQuery = 'SELECT * FROM employees';
const addDepartmentQuery = 'INSERT INTO departments (name) VALUES (?)';
// Similar queries for addRole, addEmployee, and updateEmployeeRole

module.exports = { viewDepartmentsQuery, viewRolesQuery, viewEmployeesQuery, addDepartmentQuery, /* addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery */ };
