const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let records = [];

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '/public/index.html'), (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Server Error');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        }
      });
});

router.get('/chatbot.js', (req, res) => {
  fs.readFile(path.join(__dirname, "/public/chatbot.js"), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Server Error");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/javascript");
      res.end(data);
    }
  });
});

//showing demo records
router.get('/gemini', (req, res) => {
  const variableValue = process.env['GEMINI_API_KEY'];
  res.send(variableValue);
});

app.use('/.netlify/functions/server', router);
module.exports.handler = serverless(app);