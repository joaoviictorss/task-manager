const connection = require('../db/connection')

exports.getAllTaks = async () => {
  const tasks = await connection.execute('SELECT * FROM tasks')
  return tasks
}

