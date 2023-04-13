const express = require("express");
const assignmentRouter = express.Router();
const assignmentController = require("../controllers/assignment.controller");

assignmentRouter.get("/userDeatils", assignmentController.assignment1);
assignmentRouter.get("/summary", assignmentController.assignment2);

module.exports = assignmentRouter;
