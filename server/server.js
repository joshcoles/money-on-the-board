const express = require('express');
const request = require('request');

// ============== Dependencies =================
const bodyParser          = require('body-parser');


const app                 = express();

app.set('port', process.env.port || 8080);

app.set('view engine', 'ejs');

// const WebSocketServer  = require('ws');

// ============== Middleware =================

// app.use(express.static('public'));         // TODO: this got irrelevantized by Cerberus, right?
app.use('/dist', express.static('../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));



// ============== Routes ===================

app.get('/', (req, res) => {
  res.render('landing-page');
});

app.get('/campaigns', (req, res) => {
  res.render('index');
});

app.get('/campaigns/new', (req, res) => {
  res.render('campaign-new');
});

app.get('/campaigns/:id', (req, res) => {
});

app.post('/campaigns', (req, res) => {
  console.log('***Form Submitted***')
  let game = req.body.game;
  let campaign_name = req.body.campaign_name;
  let charity_name = req.body.charity_name;
  let charity_url = req.body.charity_url;
  let hashtag = req.body.hashtag;
  let email = req.body.email;
  let password = req.body.password;
  console.log("Game: " + game);
  console.log("Campaign name: " + campaign_name);
  console.log("Charity name: " + charity_name);
  console.log("Charity url: " + charity_url);
  console.log("Hashtag: " + hashtag);
  console.log("Email: " + email);
  console.log("Password: " + password);
  res.redirect("/campaigns");
});

app.delete('/campaigns/:id', (req, res) => {
});

app.get('/api/campaigns/:id', (req, res) => {
  request('http://localhost:4000/api/campaigns/1', (err, response, body) => {
    const pledge_events = ['gamesetup', 'faceoff', 'goal', 'shotsaved', 'hit', 'penalty', 'assist'];
    const pledge_events_array = [];

    // res.send(body);
    //Filter
    // console.log("body test", body)
    // console.log("json parse", JSON.parse(body))
    let gameObject = JSON.parse(body);

    gameObject.periods.forEach(function(period) {
      period.events.forEach(function(event) {
        if (pledge_events.includes(event.event_type)) {
          pledge_events_array.push("Time " + event.clock + ": " + event.description);
        }
      })
    })
    console.log("test pledge", pledge_events_array)
    res.send(pledge_events_array[pledge_events_array.length-1])
    // res.send(pledge_events_array)

  });
});

app.listen(app.get('port'), (err) => {
  if (err) throw err;
  console.log(`MOTB server running on port ${app.get('port')}`);
});
