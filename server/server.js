const express = require('express');
const request = require('request');
const app = express();
const http = require('http');
const server = require('http').Server(app);
const io = require('socket.io')(server);


// ============== Dependencies =================
const bodyParser          = require('body-parser');


app.set('view engine', 'ejs');

// ============== Middleware =================


app.use('/dist', express.static('../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

// ============== Routes ===================

app.get('/', (req, res) => {
  console.log("Is this working?")
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
  });
});


// ============== Sockets ==================

io.on('connection', function (socket) {
  request('http://localhost:4000/api/campaigns/1', (err, response, body) => {
    const pledge_events = ['gamesetup', 'faceoff', 'goal', 'shotsaved', 'hit', 'penalty', 'assist'];

    let gameObject = JSON.parse(body);

    let filteredEvents = gameObject.periods.reduce(function (acc, period) {
      return acc.concat(period.events);
    }, []).filter(function (event) {
      return pledge_events.includes(event.event_type);
    });

    let pledge_events_array = filteredEvents.map(function (event) {
      return 'Time ' + event.clock + ': ' + event.description;
    });

    pledge_events_array.forEach(function (event_string, index) {
      (function (event_string, delay) {
        setTimeout(function () {
        socket.emit('news', {event: event_string})
      }, delay);
      })(event_string, (index + 1) * 1000);

    });
  });

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(process.env.port || 8080, (err) => {
  if (err) throw err;
  console.log(`MOTB server running`);
});

io.listen(server);
