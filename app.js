// Configure Express.
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://employee-management-56b09.web.app/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
});

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
