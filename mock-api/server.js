const express = require('express');
const game = require('./data/play-by-play.json');

let period = 0;
let periodEvent = 0;

const app = express();

  app.set('port', process.env.port || 4000);

function shouldAdvancePeriod(gameRightNow) {
  return gameRightNow.periods[period].events.length >= game.periods[period].events.length && period <= game.periods.length;
}

app.get('/api/campaigns/:id', (req, res) => {
  const gameRightNow = Object.assign({}, game);
  gameRightNow.periods = game.periods.slice(0, period + 1);
  gameRightNow.periods[period] = Object.assign({}, game.periods[period]);
  gameRightNow.periods[period].events = gameRightNow.periods[period].events.slice(0, periodEvent + 1);
  gameRightNow.deleted_events = [];
  res.json(gameRightNow);
  if (shouldAdvancePeriod(gameRightNow)) {
    period += 1;
    periodEvent = 0;
  } else {
    periodEvent += 1;
  }
});

app.listen(app.get('port'), (err) => {
  if (err) throw err;
  console.log(`Mock API server running on port ${app.get('port')}`);
});
