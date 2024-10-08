const express = require("express");
const db = require("../db.js");
const router = express.Router();

// ---------------------------------------------
// DB Connection
// ---------------------------------------------
db.mongoose.connect(db.uri);

// ---------------------------------------------
// **** Login ****
// ---------------------------------------------
router.post("/", async (req, res) => {
    const existingUser = req.body;

    // Find the user.
    let dbResponse = await db.user.findOne({email: existingUser.email});

    // Check hash password vs the given plain text password.
    let isMatch = await dbResponse.comparePassword(existingUser.password);

    // If a user with that email exists...
    if (dbResponse) {
        // And if their password matches the one in the DB...
        if(isMatch) {
            response = {
                "message": "Login successful."
            }

            // Send the successful login response.
            res.status(200).json(response);
        }
    }

    // Invalid credentials.
    if (!isMatch) {
        response = {
            "status": false,
            "message": "Invalid email or password."
        }
        
        // Send invalid credentials response.
        res.status(404).json(response);
    }
});

module.exports = router;