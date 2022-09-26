const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const fs = require('fs');

app.use(express.static('public'));

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  

  app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data)=>{
    res.json(JSON.parse(data));
    })
  });

  app.post('/api/notes', (req, res) => {
    req.body; 
    res.json(req.body);
  });

  app.get('*', function(req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.listen(port, () => {
    console.log(`Server is on port ${port}`)
  })