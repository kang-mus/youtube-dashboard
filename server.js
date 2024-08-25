require('dotenv').config();

const cors = require('cors');
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const channelRoutes = require('./routes/channel');
const analyticsRoutes = require('./routes/analytics');

// Import models to ensure they are registered with Sequelize
require('./models/User');
require('./models/Channel');

const app = express();
app.use(express.json());

// Middleware untuk menangani CORS
app.use(cors({
    origin: 'http://localhost:3000' // Ganti dengan URL frontend jika diperlukan
}));
// Middleware lainnya
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/analytics', analyticsRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Sync database and create tables if they don't exist
sequelize.sync({ force: false }) // force: true akan menghapus dan membuat ulang tabel setiap kali aplikasi dijalankan
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));