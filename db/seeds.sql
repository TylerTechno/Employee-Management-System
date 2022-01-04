INSERT INTO department(department_name)
VALUES ('Manager');

INSERT INTO role(title, salary, department_id)
VALUES ('General Manager', 350000.00, 01);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Tyler', 'Everett', 01, NULL);