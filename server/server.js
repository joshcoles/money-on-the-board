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
  res.redirect("/campaign/:id")
});

app.post('/campaign/:id/delete', (req, res) => {

});

app.listen(PORT, () => {
 console.log('App Listening on Port ', PORT);
});
