const { getAll } = require("../models/tasksModel")

exports.getAll = async (req, res) => {
  const tasks = await getAll()
  return res.status(200).json(tasks)
}
