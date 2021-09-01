const express = require("express");
// const bcrypt = require("bcryptjs");
const validator = require("validator");
// const jwt = require("jsonwebtoken");
const multer = require("multer");
const Task = require("../model/task");

// const JWT_SECRET = process.env.JWT_KEY;

exports.add_task = async (req, res, next) => {
  try {
    taskData = { 
      title: req.body.title,
      info: req.body.info,
      task: "/task/" + req.file.filename,
      deadline: req.body.deadline,
      postedBy: req.userData.id,
      fullMarks: req.body.fullMarks,

    };

    const createTask = await Task.create(taskData);

    const response = await Task.findOne({ _id: createTask._id })
      .populate(
        "postedBy", "username profile"
      );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.allTasks = async (req, res) => {
  try {
    const data = await Task.find()
      .populate(
        "postedBy", "username profile"
      );

    res.status(200).json(data.reverse());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.get_myTask = async (req, res) => {
  try {
    const data = await Task.find({ postedBy: req.userData.id });


    res.status(200).send(data);

  } catch (error) {
    res.status(500).send(error);
  }
}

exports.delete_task = async (req, res) => {
  try {
    const taskId = req.body.taskId;
    console.log(taskId)
    const deleted = await Task.findByIdAndDelete(taskId)
      .populate(
        "postedBy", "username profile"
      );

    if (deleted) {
      res.status(200).json({
        deleted: true,
        data: deleted
      })
    } else {
      res.status(200).json({
        deleted: false,
      })
    }

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.post_answer = async (req, res) => {
  try {
    answerData = {
      taskId: req.body.taskId,
      answer: "/answer/" + req.file.filename,
      // postedByUser: req.body.username,
      answerBy: req.userData.id,
      remark: req.body.remark
    };

    // ToDO: to prevent user from answering multiple times

    const checkAns = await Task.findOne({ _id: req.body.taskId, 'answers.answerBy': req.userData.id })

    if (checkAns) {
      res.status(400).json({
        error: "already answered.!",
        answered: true
      })
    } else {

      const response = await Task.findOneAndUpdate({ _id: req.body.taskId }, { $push: { 'answers': answerData } }, { new: true })
        .populate("postedBy", "username profile")
        .populate('answers.answerBy', 'username profile')

      res.status(200).json(response);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

