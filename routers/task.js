const express = require("express");
const router = new express.Router();

const { ok } = require("assert");
const { validate } = require("../model/task");
const checkAuth = require("../middleware/check-auth");
const TaskController = require("../controllers/task");
const task = require("./../middleware/task")
const answer = require("./../middleware/answer");



router.post("/task/add", checkAuth, task.task, TaskController.add_task);

router.post('/tasks', TaskController.allTasks)

router.post("/mentor/tasks", checkAuth, TaskController.get_myTask)

router.post("/task/delete", checkAuth, TaskController.delete_task);     //taskId




router.post("/task/answer", checkAuth, answer.answer, TaskController.post_answer);         //taskId, answer(file - pdf)



module.exports = router;