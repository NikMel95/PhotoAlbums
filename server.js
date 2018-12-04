const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const clientDir = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, clientDir + '/build')));


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, clientDir + '/build', 'index.html'));
});

app.listen(port, () => console.log(`Port server: ${port}`));