const express = require('express');
const game    = require('./data/play-by-play.json');

let period = 0;
let periodEvent = 0;

const app = express();

  app.set('port', process.env.port || 4000);

function shouldAdvancePeriod(gameRightNow) {
  return gameRightNow.periods[period].events.length >= game.periods[period].events.length && period <= game.periods.length;
}

app.get('/api/campaigns/:id', (req, res) => {
  res.json(game);
});

app.listen(app.get('port'), (err) => {
  if (err) throw err;
  console.log(`Mock API server running on port ${app.get('port')}`);
});
