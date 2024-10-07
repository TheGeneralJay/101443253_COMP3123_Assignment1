const express = require("express");
const db = require("../db.js");
const router = express.Router();

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

router.post("/", async (req, res) => {
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

module.exports = router;