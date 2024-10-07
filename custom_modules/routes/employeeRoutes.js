const express = require("express");
const db = require("../db.js");
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

router.get(`/:id`, async (req, res) => {
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

router.put(`/:id`, async (req, res) => {
    // Ensure ID is a valid ObjectId. ** HANDLE WITH ERRORS PROPERLY LATER
    if (!db.mongoose.isValidObjectId(req.params.id)) {
        response = {
            "status": false,
            "message": `Employee with ID ${req.params.id} does not exist.`
        }

        res.status(404).json(response);
        return;
    }

    // Grab what the user wishes to change.
    const empJson = req.body;
    const empJsonKeys = Object.keys(empJson);

    const employee = await db.employee.findById(req.params.id);

    // Define update variable.
    const update = {
        $set: {
            
        }
    }

    // If employee exists...
    if (employee) {
        // Grab all of the keys in the schema.
        const schemaKeys = Object.keys(employee.schema.obj);
        
        
    }

});

module.exports = router;