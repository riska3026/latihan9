const express = require('express');
const app = express();
const PORT = 8001;
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/products.routes');
const authRoutes = require("./routes/auth.routes");

app.use(express.json());   // HARUS DI ATAS ROUTER

app.use(express.urlencoded({ extended: true }));


// Serve uploaded images
// (tidak lagi menggunakan foto) - hapus static img
// app.use('/img', express.static('img'));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
require('dotenv').config(); 
app.use('/api/auth', authRoutes);