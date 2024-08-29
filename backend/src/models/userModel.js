const connection = require('../db/connection');
const bcrypt = require('bcryptjs');

exports.getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error(error);
    throw error; // Propaga o erro para ser tratado pelo controller que chama esta função
  }
};

exports.createUser = async (name, email, hashedPassword) => {
  try {
    const query = 'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [name, email, hashedPassword]);

    return result;
  } catch (error) {
    console.error('create user error:', error);
    throw error; // Propaga o erro para ser tratado pelo controller que chama esta função
  }
};

// exports.login = async (email, password) => {
//   const existingUser = await this.getUserByEmail(email);

//   if (!existingUser) {
//     return { error: "Este usuario não existe!" };
//   }

//   console.log(existingUser);
//   const auth = await bcrypt.compare(password, existingUser.password_hash);

//   if (!auth) {
//     throw Error('incorrect password');
//   }

//   return existingUser;
// };
