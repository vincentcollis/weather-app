// const express = require('express');
import express from 'express';
import weatherController from '../controllers/weatherController.js';

const router = express.Router();

// const weatherController = require('../Controllers/weatherController');

// TEST ROUTE
router.get('/ping', (req, res) => {
  console.log('pong');
  return res.status(200).json('pong');
});

router.get('/', weatherController.getLongitudeAndLatitude, (req, res) => {
  return res.status(200).json();
});

// weatherController.getForcast,

export default router;
