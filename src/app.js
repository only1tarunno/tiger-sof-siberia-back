require("dotenv").config();
const express = require("express");
const applyMiddleWares = require("./middleWares/applyMiddleWares");
const app = express();

// routers
const authRoutes = require("./routes/Authentication/authentication");
const allUsers = require("./routes/user");

// middlewares
applyMiddleWares(app);

// jwt related api
app.use(authRoutes);

// allUsers api
app.use(allUsers);

// server health check api
app.get("/", (req, res) => {
  res.send("server is running");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find [${req.originalUrl}] on the server`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
