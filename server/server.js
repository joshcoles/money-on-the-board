require('dotenv').config();


const PORT                = 4000;
const express             = require('express');
const app                 = express();
const bodyParser          = require('body-parser');
// const WebSocketServer     = require('ws');

app.set('view engine', 'ejs');
app.set('views', '../client/public/views');
app.use('/dist', express.static('../client/dist'));

// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage - Informs users about MOTB and presents campaign page
app.get('/', (req, res) => {
  res.render('landing-page');
});


app.get('/campaign', (req, res) => {
  res.render('index');
});

app.get('/campaign/new', (req, res) => {
  res.render('campaign-new');
});

app.get('/testroute', (req, res) => {
  res.render('campaign-new');
});

app.get('/campaign/:id', (req, res) => {
});

app.post('/campaign/new', (req, res) => {
  console.log('form submitted')
  let campaign_name = req.body.campaign_name
  let charity_name = req.body.charity_name
  let charity_url = req.body.charity_url
  let hashtag = req.body.hashtag
  let email = req.body.email
  console.log(campaign_name)
  console.log(charity_name)
  console.log(charity_url)
  console.log(hashtag)
  console.log(email)
  res.redirect("/campaign")
});

app.post('/campaign/:id/delete', (req, res) => {

});

app.listen(PORT, () => {
 console.log('App Listening on Port ', PORT);
});
