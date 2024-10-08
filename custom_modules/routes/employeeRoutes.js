const express = require("express");
const db = require("../db.js");
const { query, validationResult } = require("express-validator");
const router = express.Router();

// ---------------------------------------------
// DB Connection
// ---------------------------------------------
db.mongoose.connect(db.uri);

// ---------------------------------------------
// Employee Management
// ---------------------------------------------

// ---------------------------------------------
// **** Get Employees ****
// ---------------------------------------------

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
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

// Validate that the id parameter is not empty (and ensures it is safe from XSS).
router.get(`/:id`, query("id").notEmpty().escape(), async (req, res) => {
    const result = validationResult(req);

    console.log(`Result:  ${result.isEmpty()}`);

    // Ensure ID is a valid ObjectId. ** HANDLE WITH ERRORS PROPERLY LATER
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

// Validate that the id parameter is not empty (and ensures it is safe from XSS).
router.put(`/:id`, query("id").notEmpty().escape(), async (req, res) => {
    
    // Ensure ID is a valid ObjectId. ** HANDLE WITH ERRORS PROPERLY LATER
    if (!db.mongoose.isValidObjectId(req.params.id)) {
        response = {
            "status": false,
            "message": `Employee with ID ${req.params.id} does not exist.`
        }

        res.status(404).json(response);
        return;
    }

    // Grab the employee that the user wants to update.
    const employee = await db.employee.findById(req.params.id);
    // Grab the JSON body sent in for update.
    const requestedChanges = req.body;
    // Save the keys of the JSON request for easy access.
    const changeKeys = Object.keys(requestedChanges);

    // Loop through changeKeys...
    changeKeys.forEach(key => {
        // If individual key matches one in the employee schema, update.
        if (employee[key]) {
            employee[key] = requestedChanges[key];
        }
    });

    response = {
        "message": "Employee details updated successfully."
    }

    // Save and send response.
    await employee.save();
    res.status(200).send(response);
});

// ---------------------------------------------
// **** Delete Employee ****
// ---------------------------------------------

router.delete(`/`, async (req, res) => {
    // Grab the ID from the query params.
    const employeeId = req.query.id;

    // Ensure ID is a valid ObjectId. ** HANDLE WITH ERRORS PROPERLY LATER
    if (!db.mongoose.isValidObjectId(employeeId)) {
        response = {
            "status": false,
            "message": `Employee with ID ${employeeId} does not exist.`
        }

        res.status(404).json(response);
        return;
    }

    // Find employee with ID.
    const employee = await db.employee.findById(employeeId);

    // Delete the employee.
    await employee.deleteOne({ _id: employeeId });

    // Return response to the console.
    response = {
        "message": "Employee deleted successfully."
    }

    // Note: status 204 will not send a response, so I've used
    // 200, which will allow this message to play.
    res.status(200).send(response);
});

module.exports = router;