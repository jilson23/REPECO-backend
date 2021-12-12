const express = require('express');
const cors = require('cors');

function connectDB(app) {
  app.use(express.json());
  app.use(cors());
}

module.exports = connectDB;
