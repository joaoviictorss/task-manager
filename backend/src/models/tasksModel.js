const connection = require('../db/connection')

exports.getAll = async () => {
  const tasks = await connection.execute('SELECT * FROM tasks')
  return tasks
}

