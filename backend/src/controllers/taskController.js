const { getAllTasks } = require("../models/tasksModel")

exports.getAllTasks = async (req, res) => {
  const tasks = await getAllTasks()
  return res.status(200).json(tasks)
}
