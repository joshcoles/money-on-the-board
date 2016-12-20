const express = require('express');
const request = require('request');

const app = express();

app.set('port', process.env.port || 8080);

app.use(express.static('public'));

app.get('/api/campaigns/:id', (req, res) => {
  request('http://localhost:4000/api/campaigns/1', (err, response, body) => {
    res.send(body);
  });
});

app.listen(app.get('port'), (err) => {
  if (err) throw err;
  console.log(`MOTB server running on port ${app.get('port')}`);
});
