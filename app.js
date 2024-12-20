// Configure Express.
const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  const origin = "https://employee-management-56b09.firebaseapp.com";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());

// Define server paths for ease of use.
const signupPath = "/api/v1/user/signup";
const loginPath = "/api/v1/user/login";
const employeesPath = "/api/v1/emp/employees";

// Router variables.
const signupRoutes = require("./custom_modules/routes/signupRoutes.js");
const loginRoutes = require("./custom_modules/routes/loginRoutes.js");
const employeeRoutes = require("./custom_modules/routes/employeeRoutes.js");

// Use the routers.
app.use(signupPath, signupRoutes);
app.use(loginPath, loginRoutes);
app.use(employeesPath, employeeRoutes);

app.listen(port, () => {
  console.log(`App listening at port ${port}.`);
});
