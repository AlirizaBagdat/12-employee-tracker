const viewDepartmentsQuery = 'SELECT * FROM departments';
const viewRolesQuery = 'SELECT * FROM roles';
const viewEmployeesQuery = 'SELECT * FROM employees';
const addDepartmentQuery = 'INSERT INTO departments (name) VALUES (?)';
const addRoleQuery = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
const addEmployeeQuery = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
const updateEmployeeRoleQuery = 'UPDATE employees SET role_id = ? WHERE employee_id = ?';


// Similar queries for addRole, addEmployee, and updateEmployeeRole

module.exports = { viewDepartmentsQuery, viewRolesQuery, viewEmployeesQuery, addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery  };
