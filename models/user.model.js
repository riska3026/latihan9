const db = require('./db.config');

// Model User (berisi query dasar)
const User = {
  // GET semua user
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  // GET user berdasarkan ID
  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  // CREATE user baru
  create: (data, callback) => {
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [data.name, data.email, data.password], callback);
  },

  // UPDATE user
  update: (id, data, callback) => {
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [data.name, data.email, id], callback);
  },

  // DELETE user
  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  },

  // Get user by Email (untuk login)
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
};

module.exports = User;