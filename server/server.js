// ============== Dependencies =================
const express             = require('express');
const request             = require('request');
const bodyParser          = require('body-parser');
const db                  = require('./db')

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
  res.send("good jorb, eh");
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

  db.select('id').from('games').where({game_uuid: game}).then((game_ids) => {
    if (game_ids.length != 1) {
      res.send("game not found, be serious");
    }
    const game_id = game_ids[0].id;
    db.insert([{name: charity_name, url: charity_url}])
    .into('charities')
    .returning('id')
    .then(function(charity_ids) {
      if (charity_ids.length != 1) {
        console.error("number of found charities =", charity_ids.length);
        res.redirect('campaigns/new');
      }
      const charity_id = charity_ids[0];
      console.log("charity_id", charity_id);

      db.insert([{
        handle: hashtag,
        title: campaign_name,
        charity_id: charity_id,
        game_id: game_id,
        admin_id: 1,       // this is total bullshit, we need to get this from the session or something
      }])
      .into('campaigns')
      .returning('id')
      .then(function(result) {
        console.log("campaign insert result", result);
        if (result.length === 1) {
          const campaign_id = result[0];
          res.redirect(`campaigns/${campaign_id}`);
        } else {
          console.error("number of found campaigns =", result.length);
          res.redirect('campaigns/new');
        }
      })
      .catch(function(error){
        console.error("error when inserting campaign", error);
        res.redirect('campaigns/new');
      });
    });
  });
});

app.delete('/campaigns/:id', (req, res) => {
});

app.get('/api/campaigns/:id', (req, res) => {
  request('http://localhost:4000/api/campaigns/1', (err, response, body) => {
    const pledge_events = ['gamesetup', 'faceoff', 'goal', 'shotsaved', 'hit', 'penalty', 'assist'];
    const pledge_events_array = [];

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
