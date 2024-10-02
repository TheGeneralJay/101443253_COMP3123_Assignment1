const db = require("./custom_modules/db.js");
// Configure Express.
const express = require("express");
const { query, validationResult } = require("express-validator");
const app = express();
const port = 3000;
app.use(express.json());

// Define server paths for ease of use.
const signupPath = "/api/v1/user/signup";
const loginPath = "/api/v1/user/login";
const employeesPath = "/api/v1/emp/employees";

// ---------------------------------------------
// DB Connection
// ---------------------------------------------
db.mongoose.connect(db.uri);

// ---------------------------------------------
// User Management
// ---------------------------------------------

// ---------------------------------------------
// **** Signup ****
// ---------------------------------------------

app.post(signupPath, async (req, res) => {
    // Create a new user using the User schema.
    const user = new db.user(req.body);

    try {
        // Save the new user.
        await user.save();

        // Generate the success response.
        response = {
            "message": "User created successfully.",
            "user_id": user._id
        }
        // Send status of 201 and JSON response.
        res.status(201).json(response);

    } catch (err) {
        res.status(false).send(err);
    }
});

// ---------------------------------------------
// **** Login ****
// ---------------------------------------------
app.post(loginPath, async (req, res) => {
    const existingUser = req.body;

    // Find the user.
    let dbResponse = await db.user.findOne({email: existingUser.email});

    // If a user with that email exists...
    if (dbResponse) {
        // And if their password matches the one in the DB...
        if (dbResponse.password === existingUser.password) {
            response = {
                "message": "Login successful."
            }

            // Send the successful login response.
            res.status(200).json(response);
        }
    }

    // Invalid credentials.
    if (!dbResponse || dbResponse.password !== existingUser.password) {
        response = {
            "status": false,
            "message": "Invalid email or password."
        }
        
        // Send invalid credentials response.
        res.status(404).json(response);
    }
});

// ---------------------------------------------
// Employee Management
// ---------------------------------------------

// ---------------------------------------------
// **** Get Employees ****
// ---------------------------------------------

app.get(employeesPath, async (req, res) => {
    try {
        // Grab all employees.
        employees = await db.employee.find({});

        // Return them in JSON.
        res.status(200).json(employees);
    } catch (err) {
        res.status(false).send(err);
    }
});

// ---------------------------------------------
// **** Create Employees ****
// ---------------------------------------------

app.post(employeesPath, async (req, res) => {
    // Create new employee based on request body.
    const employee = new db.employee(req.body);

    try {
        // Save the employee to the DB.
        await employee.save();

        response = {
            "message": "Employee created successfully.",
            "employee_id": employee._id
        }

        // Send success response.
        res.status(201).json(response);

    } catch (err) {
        res.status(false).send(err);
    }
});

// ---------------------------------------------
// **** Get Employee by ID ****
// ---------------------------------------------

app.get(`${employeesPath}/:id`, async (req, res) => {
    // Ensure ID is a valid ObjectId.
    if (!db.mongoose.isValidObjectId(req.params.id)) {
        response = {
            "status": false,
            "message": `Employee with ID ${req.params.id} does not exist.`
        }

        res.status(404).json(response);
        return;
    }

    try {
        // Find employee by ID.
        const employee = await db.employee.findById(req.params.id);
        
        // If employee exists...
        if (employee) {
            // Return employee.
            res.status(200).json(employee);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// ---------------------------------------------
// **** Update Employee ****
// ---------------------------------------------

app.listen(port, () => {
    console.log(`App listening at port ${port}.`);
});