const express = require('express');
const app = express();
const PORT = 8001;
const userRoutes = require('./routes/user.routes');

app.use(express.json());   // HARUS DI ATAS ROUTER

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
