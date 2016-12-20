require('dotenv').config();

// ============== Dependencies =================
const express             = require('express');
const bodyParser          = require('body-parser');


const app                 = express();
const PORT                = 4000;


app.set('view engine', 'ejs');

// const WebSocketServer  = require('ws');

// ============== Middleware =================

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

app.listen(PORT, () => {
 console.log('App Listening on Port ', PORT);
});
