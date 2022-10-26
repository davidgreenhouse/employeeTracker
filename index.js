const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();

let allRoles =[];
let allDepts = [];
let allEmployees = [];
let employeeNames = [];
let menuSelection;

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'employees_db'
    },
    console.log(`\nConnected to the employees_db database.\n`)
);

const addEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select employee role',
            choices: allRoles
        },
        {
            type: 'list',
            name: 'fullName',
            message: 'Select manager name',
            choices: employeeNames
        }
    ])
    .then((data) => {
        let newFirstName = data.firstName;
        let newLastName = data.lastName;
        let newManager;
        if (data.fullName === 'NONE') {
            newManager = null;
        } else {
            newManager = idMatcher(data);
        }
        db.query(`SELECT id FROM employees`, (err, results) => {
            let newId = results.length;
            newId++;
            db.query(`SELECT id FROM employee_role WHERE title = ?`, data.role, function(err, results) {
                let values = `${newId}, '${newFirstName}', '${newLastName}', ${results[0].id}, ${newManager}`;
                db.query(`INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (${values})`, function(err, result) {
                    console.log('\nNew Employee Added!\n')
                    mainMenu();
                })
            })
        })
    })
}

/* const addDept = () => {
    inquirer.prompt(
        {
            type: '',
            name: '',
            message: ''
        }
    )
    .then((data) => {
        db.query() => {
            console.log()
            mainMenu()
        })
    })
} */

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter job title'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter job salary'
        },
        {
            type: 'list',
            name: 'dept',
            message: 'Enter job department',
            choices: allDepts
        }
    ])
    /* .then((data) => {
        let title = ;
        let salary = ;
        db.query() => {
            let roleId = ;
                    mainMenu();
                })
            })
        })
    }) */
}