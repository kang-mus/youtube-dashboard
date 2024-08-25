require('dotenv').config(); 

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        connectTimeout: 60000 // Set timeout ke 60 detik
      }
    }
  );
  

module.exports = sequelize;
