const express = require('express');
const sched   = require('./sample-data/sportsradar-schedule.json')
const game    = require('./data/play-by-play.json');
const home    = require('./sample-data/sportsradar-roster-ottawa.json');
const away    = require('./sample-data/sportsradar-roster-toronto.json');

let period = 0;
let periodEvent = 0;

const app = express();

app.set('port', process.env.port || 4000);

function shouldAdvancePeriod(gameRightNow) {
  return gameRightNow.periods[period].events.length >= game.periods[period].events.length && period < game.periods.length - 1;
}

app.get('/api/campaigns/:id', (req, res) => {
const gameRightNow = Object.assign({}, game);
 gameRightNow.periods = game.periods.slice(0, period + 1);
 gameRightNow.periods[period] = Object.assign({}, game.periods[period]);
 gameRightNow.periods[period].events = gameRightNow.periods[period].events.slice(0, periodEvent + 1);
 res.json(gameRightNow);
 if (shouldAdvancePeriod(gameRightNow)) {
   period += 1;
   periodEvent = 0;
 } else {
   periodEvent += 1;
 }

});

app.get('/api/schedule', (req, res) => {
  res.json(sched);
});

app.get('/api/campaigns/:id/hometeam', (req, res) => {
  res.json(home);
});

app.get('/api/campaigns/:id/awayteam', (req, res) => {
  res.json(away);
});

app.listen(app.get('port'), (err) => {
  if (err) throw err;
  console.log(`Mock API server running on port ${app.get('port')}`);
});
