const db = require('./db.config');

// Model Products (berisi query dasar)
const Product = {
  // GET semua produk
  getAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },

  // GET produk berdasarkan ID
  getById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
  },

// CREATE produk baru
create: (data, callback) => {
  const cols = [];
  const placeholders = [];
  const values = [];

  if (data.id) {
    cols.push('id'); placeholders.push('?'); values.push(data.id);
  }
  if (data.name) {
    cols.push('nama'); placeholders.push('?'); values.push(data.name);
  }
  if (typeof data.price !== 'undefined') {
    cols.push('harga'); placeholders.push('?'); values.push(data.price);
  }
  if (data.description) {
    cols.push('deskripsi'); placeholders.push('?'); values.push(data.description);
  }
  if (cols.length === 0) {
    return callback(new Error('No data provided for insert'));
  }

  const sql = `INSERT INTO products (${cols.join(',')}) VALUES (${placeholders.join(',')})`;
  db.query(sql, values, callback);
},


update: (id, data, callback) => {
  const sets = [];
  const values = [];

  if (data.name) {
    sets.push('nama = ?'); values.push(data.name);
  }
  if (typeof data.price !== 'undefined') {
    sets.push('harga = ?'); values.push(data.price);
  }
  if (data.description) {
    sets.push('deskripsi = ?'); values.push(data.description);
  }
  if (sets.length === 0) {
    return callback(new Error('No data provided for update'));
  }

  const sql = `UPDATE products SET ${sets.join(', ')} WHERE id = ?`;
  values.push(id);
  db.query(sql, values, callback);
},


  // DELETE produk
  delete: (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
  }
};

module.exports = Product;
