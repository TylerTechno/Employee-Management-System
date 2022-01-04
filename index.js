const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'employee_db',
  },
  console.log('Connection established')
);

connection.connect(function (err) {
  if (err) throw err;
  console.log('SQL connected');
  init();
});

function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'init',
        choices: [
          'Employees',
          'Departments',
          'Roles',
          'Add Employee',
          'Add Department',
          'Add Role',
          'Edit Employee',
          '**END***',
        ],
        message: 'Whats next?',
      },
    ])
    .then(function (res) {
      switch (res.init) {
        case 'Employees':
          employees();
          break;

        case 'Departments':
          departments();
          break;

        case 'Roles':
          roles();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Edit Employee':
          editEmployee();
          break;

        default:
          process.exit(1);
      }
    });
}

function employees() {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(table.getTable(result));
    init();
  });
}
function departments() {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(table.getTable(result));
    init();
  });
}
function roles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(table.getTable(result));
    init();
  });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeFirstName',
        message: 'Please enter the first name of the emloyee.',
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: 'Please enter the last name of the employee.',
      },
      {
        type: 'input',
        name: 'employeeRoleId',
        message: 'What is the role of the employee?',
      },
      {
        name: 'manager',
        type: 'input',
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
        message: 'Enter manager ID',
        default: '0',
      },
    ])
    .then(function (res) {
      const query = 'INSERT INTO employee SET ?';
      connection.query(query, {
        first_name: res.employeeFirstName,
        last_name: res.employeeLastName,
        role_id: res.employeeRoleId,
        manager_id: res.manager,
      });
      employees();
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the role?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is this roles salary?',
      },
      {
        type: 'input',
        name: 'roleDepartmentId',
        message: 'What is the ID to the corrosponding department?',
      },
    ])
    .then(function (res) {
      const query = 'INSERT INTO role SET ?';
      connection.query(query, {
        title: res.roleTitle,
        salary: res.roleSalary,
        department_id: res.roleDepartmentId,
      });
      roles();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department you want to add?',
      },
    ])
    .then(function (res) {
      const query = 'INSERT INTO department SET ?';
      connection.query(query, {
        department_name: res.departmentName,
      });
      departments();
    });
}

function editEmployee() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'update',
        choices: ['Role', 'Department', 'Employee'],
        message: 'What would you like to update?',
      },
    ])
    .then(function (res) {
      switch (res.update) {
        case 'Department':
          updateDepartment();
          break;
        case 'Employee role':
          updateEmployeeRole();
          break;
        case 'Employee':
          updateEmployee();
          break;
        default:
          console.log('default');
      }
    });
}
