const createUser = require("../api/UsersController/createUser");
const router = require("express").Router();

// create user
router.post("/user", createUser);

module.exports = router;
