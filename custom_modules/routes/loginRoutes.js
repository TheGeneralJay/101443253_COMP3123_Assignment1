const express = require("express");
const db = require("../db.js");
const router = express.Router();
const errors = require("../errors/errorHandler.js");

// ---------------------------------------------
// DB Connection
// ---------------------------------------------
db.mongoose.connect(db.uri);

// ---------------------------------------------
// **** Login ****
// ---------------------------------------------
router.get(`/:email`, async (req, res) => {
  const userEmail = req.params.email;
  // If we get here, find the employee and send the result.
  try {
    // Find user by email.
    const user = await db.user.findOne({ email: userEmail });

    // If user exists...
    if (user) {
      // Return user.
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).send(errors.DEFAULT_ERROR);
  }
});

router.post("/", async (req, res) => {
  const existingUser = req.body;

  // Find the user.
  let dbResponse = await db.user.findOne({ email: existingUser.email });

  // If a user with that email does not exist, throw error.
  try {
    if (!dbResponse) {
      throw new Error();
    }
  } catch (err) {
    res.status(490).send(errors.EMAIL_DOES_NOT_EXIST_ERROR);
    return;
  }

  // If their password matches the one in the DB, login and send response.
  try {
    // Check hash password vs the given plain text password.
    let isMatch = await dbResponse.comparePassword(existingUser.password);

    if (isMatch) {
      response = {
        message: "Login successful.",
      };

      // Send the successful login response.
      res.status(200).json(response);
    } else {
      // Password does not match.
      throw new Error();
    }
  } catch (err) {
    res.status(491).send(errors.INCORRECT_PASSWORD_ERROR);
    return;
  }
});

module.exports = router;
