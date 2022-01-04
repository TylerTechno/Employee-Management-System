SELECT
employee.id AS ID,
employee.first_name AS First,
employee.last_name AS Last,
employee.role_id AS Role,
role.salary AS Salary,
manager.last_name AS Manager,
department.name AS Department

JOIN employee to its self FROM employee LEFT JOIN employee manager
    ON employee.manager_id = manager.id

JOIN role to employee table LEFT JOIN role 
    ON employee.role_id = role.title
    
JOIN department to role table LEFT JOIN department 
    ON role.department_id = department.id