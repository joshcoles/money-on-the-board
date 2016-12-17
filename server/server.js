require('dotenv').config();

const PORT        = 3000;
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const game        = require('../mock-api/sample-data/sportsradar-play-by-play-sens-vs-leafs.json');

app.set('view engine', 'ejs');
app.set('views', '../client/public/views');

const pledge_events = ['goal', 'shotsaved', 'hit', 'penalty', 'assist'];
const pledge_events_array = [];


// Game Time Function //
// Iterates through game events based on selected pledge values

game.periods.forEach(function(period) {
    console.log(period.sequence)

  period.events.forEach(function(event) {
    if (pledge_events.includes(event.event_type)) {
      pledge_events_array.push("Time " + event.clock + ": " + event.description);
    }
  })
})

let i = 0;
setInterval(function() {
  if (i === pledge_events_array.length){
    return
  }
  console.log(pledge_events_array[i])
  i++
}, 200);


// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage - Informs users about MOTB and presents campaign page
app.get('/', (req, res) => {
  res.render('index', {game, pledge_events});
});


app.get('/campaign', (req, res) => {

});

// React PAGE //
app.get('/campaign/:id', (req, res) => {

});

app.get('/campaign/new', (req, res) => {

});

app.post('/campaign/new', (req, res) => {

  res.redirect("/campaign/:id")
});

app.post('/campaign/:id/delete', (req, res) => {

});

app.listen(PORT, () => {
 console.log('App Listening on Port ', PORT);
});
