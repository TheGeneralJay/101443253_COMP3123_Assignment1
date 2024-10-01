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

// **** Signup ****
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
        res.status(false).json(err);
    }
});

// **** Login ****
app.post(loginPath, async (req, res) => {
    
});

app.listen(port, () => {
    console.log(`App listening at port ${port}.`);
});