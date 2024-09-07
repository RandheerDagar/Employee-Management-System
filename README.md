<h1 style="text-align:center">EMPLOYEE MANAGEMENT SYSTEM</h1>
<p>The Employee Management System (EMS) is a web-based application designed to streamline the management of employee data. This system enables an administrator to perform full CRUD operations (Create, Read, Update, Delete) on the employee database, ensuring efficient employee record management.</p>

<h3>Key Features:</h3>
<p><span style="font-weight:bold">Admin-Only Access:</span>The application includes an authentication system that restricts access to only authorized administrators. This ensures the confidentiality and integrity of employee data.</p>
<p><span style="font-weight:bold">Employee Database Management: </span> Admins can:
<ul>
<li>Add new employee records</li>
<li>View detailed employee information</li>
<li>Update existing employee data</li>
<li>Remove employees from the system</li>
</ul>
</p>
<p><span style="font-weight:bold">User-Friendly Interface:</span>A clean and intuitive interface that simplifies the management process for administrators.</p>

<h2>Technologies Used</h2>
<ul>
<li><span style="font-weight:bold">React : </span>Provides a dynamic and responsive user interface for the admin to manage employee records easily.</li>
<li><span style="font-weight:bold">Node.js : </span>Handles the backend logic and processes API requests between the frontend and the database.</li>
<li><span style="font-weight:bold">MySQL : </span>Stores and manages employee data, allowing efficient CRUD operations on the employee table.</li>
</ul>

<h2>User Interface Preview</h2>
<img src="./public/images/Home-page.png" alt="Home Page">
<img src="./public/images/login-page.png" alt="Home Page">
<img src="./public/images/Dashboard-page.png" alt="Home Page">
<img src="./public/images/employees.png" alt="Home Page">
<img src="./public/images/Add-Employee-form.png" alt="Home Page">
<img src="./public/images/add-department-form.png" alt="Home Page">

<h2>Installation</h2>
<ol>
<li>Clone the Employee Management System repository to your local machine using the following command:<br>
<span></span>
</li>
<li>Navigate to the project directory:<br>
<span> => cd EmployeeMs</span>
</li>
<li>Install Node.js dependencies:<br>
<span> => npm install</span>
</li>
<li>Navigate to Server Folder and install required packages:<br>
<span> => cd server and  npm install {required packages}</span>
</li>
</li>
<li>Connect MySQL properly by providing (Host, user, password,database) in db.js.
</li>
<li>Create three tables: admin, category, employee in mysql in same database as provide above.</li>
<li>Add one admin in admin table so, that you can login by using admin mail and password.</li>
<div> => CREATE TABLE admin(
id INT PRIMARY KEY,
email VARCHAR(50),
password VARCHAR(140)
);</div>
<div> => INSERT INTO admin VALUES(1, "admin@gmail.com", "123456");</div>
<div> => CREATE TABLE category(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50)
);</div>
<div> => CREATE TABLE employee (
    Emp_Id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    salary Decimal(10,2),
    position VARCHAR(255),
    department_id INT
);</div>
</ol>
<p>after all the above command run :npm run dev.</p>
