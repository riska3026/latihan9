const mysql = require('mysql2');

// Konfigurasi koneksi database 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',   // password kosong (benar)
    database: 'dbpraktikum8'
});

// Coba koneksi dengan retry sederhana
const maxRetries = 5;
const retryDelayMs = 2000;

function connectWithRetry(attempt = 1) {
    db.connect(err => {
        if (!err) {
            console.log('Terhubung ke database MySQL');
            return;
        }

        // Jika mysql2 mengembalikan AggregateError, rangkum pesan-pesan
        let details = '';
        if (err && Array.isArray(err.errors)) {
            details = err.errors.map(e => `${e.code || e.errno || ''} ${e.address || ''}:${e.port || ''} - ${e.message || e.sqlMessage || ''}`).join(' | ');
        } else {
            details = err.message || String(err);
        }

        console.error(`Koneksi database gagal (attempt ${attempt}/${maxRetries}):`, details);
        console.error('Pastikan layanan MySQL berjalan, host/port benar, dan kredensial sesuai.');

        if (attempt < maxRetries) {
            console.log(`Mencoba ulang koneksi dalam ${retryDelayMs}ms...`);
            setTimeout(() => connectWithRetry(attempt + 1), retryDelayMs);
        } else {
            console.error('Gagal terhubung ke database setelah beberapa percobaan. Aplikasi tetap berjalan tetapi beberapa fitur mungkin tidak berfungsi.');
        }
    });
}

connectWithRetry();

module.exports = db;
