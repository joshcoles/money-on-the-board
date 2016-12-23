
// ============== Dependencies =================

const request = require('request');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('cookie-session');

const util = require('util');

const inspect = (o, d = 1) => { console.log(util.inspect(o, { colors: true, depth: d }))};


app.set('port', process.env.port || 8080);
app.set('view engine', 'ejs');

// ============== Middleware =================

app.use(express.static('public'));
// app.use('/dist', express.static('../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'purplecatattack',
  keys: ['toranto', 'bimbimbop']
}));


// function that compares user input password with stored password
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
};

passport.use(new LocalStrategy((username, password, done) => {
  db('users').where({ username }).first()
  .then((user) => {
    if(!user) return done(null, false);
    if(!comparePass(password, user.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch((err) => { console.log('Here?'); return done(err); });
}));

passport.serializeUser((user, done) => {
  console.info('Serializing user');
  console.log('User: ', user.id);
  console.log('Name: ', user.name);
  if(!user) { done(new Error("User is not present")); }
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.info('Deserializing user', id);
  db('users').where({id}).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log('Setting locals');
<<<<<<< HEAD
  if(req.session.user) {
    res.locals.user = req.user;
    console.log('Username: ', res.locals.user.username);
    currentUser = res.locals.user.username;
  } 
=======

  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = !!req.user;

>>>>>>> user-auth
  next();
})

// ============== Routes ===================

app.get('/', (req, res) => {
  console.log("Is this working?");
  inspect(res.locals);
  res.render('landing-page');
});

app.get('/initialState', (req, res) => {
  res.json({
    game: [],
    pledges: [{
      user_id: 1,
      username: "Homer Simpon",
      totalPledges: [],
      pledged: [
        {id: 'i48dj', pledge_amount: 2.00, pledge_event: 'Matt Martin credited with hit', occurance: 0, owes: 0.00},
        {id: 'is820', pledge_amount: 5.00, pledge_event: 'Goal scored by Auston Matthews', occurance: 0, owes: 0.00},
        {id: 'zo09s', pledge_amount: 1.00, pledge_event: 'saved by Frederik Andersen',occurance: 0, owes: 0.00}
      ]
    }, {
      user_id: 2,
      username: "Peter Griffin",
      totalPledges: [],
      pledged:[
        {id: 'v8ud8', pledge_amount: 2.00, pledge_event: 'Goal scored by Derick Brassard', occurance: 0, owes: 0.00},
        {id: 'x29in', pledge_amount: 5.00, pledge_event: 'Zack Smith credited with hit', occurance: 0, owes: 0.00},
        {id: 'asdf8', pledge_amount: 1.00, pledge_event: 'Goal scored by Erik Karlsson', occurance: 0, owes: 0.00}
      ]
    }]
  });
});

app.get('/users/new', (req, res) => {
  res.render('signup');
});

app.post('/users/new', (req, res) => {
  console.log('FORM SUBMITTED');
  // console.log(username);
  // console.log(email);
  console.log('Password: ', req.body.password);
  if (req.body.password === req.body.confirm_password) {
    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    db.insert([{ username: username, password: password, email: email }])
    .into('users')
    .then(function (result) {
      console.log('User created successfully!', result);
      console.log('Password Hash: ', password);
    })
  } else {
    alert('Passwords do not match!!!');
  }
  req.session.user = username;
  res.redirect('/');
});

// function to handle post response
function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
};

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  // if(err) { handleResponse(res, 500, 'error'); }
  // if(!user) { handleResponse(res, 404, 'user not found'); }
  // if(user) { handleResponse(res, 200, 'success'); }
  // req.session.user = 'username';
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
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

  db.select('id').from('games').where({game_uuid: game})
  .then(game_ids => {
    if (game_ids.length != 1) {
      res.send("game not found, be serious");
    }
    const game_id = game_ids[0].id;
    db.insert([{
      handle: hashtag,
      title: campaign_name,
      game_id: game_id,
      charity_name: charity_name,
      charity_url: charity_url,
      admin_id: 1,       // to be changed
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
        res.redirect('/campaigns/new');
      }
    })
    .catch(function(error){
      console.error("error when inserting campaign", error);
      res.redirect('/campaigns/new');
    });
  });
});

app.get('/pledges/new', (req, res) => {
  res.render("pledge-new");

});

app.post('/pledges/new', (req, res) => {
  console.log("Form Submitted.")
  let pledgeTeam = req.body.team;
  let pledgePlayer = req.body.player;
  let pledgeAmount = req.body.money;
  let inGameEvent = req.body.inGameEvent;
  console.log("Your pledge team: ", pledgeTeam);
  console.log("Your pledge player: ", pledgePlayer);
  console.log("Your in-game event: ", inGameEvent);
  console.log("Your pledge amount: ", pledgeAmount);

  db.insert([{player_uuid: pledgePlayer, team_uuid: pledgeTeam, money: pledgeAmount, in_game_event_id: inGameEvent, user_id: 1, campaign_id: 1}])
    .into('pledges')
    .then(function(result) {
      console.log("Pledge insert result", result);
    })
  res.redirect('/');
});

app.delete('/campaigns/:id', (req, res) => {
});

// app.get('/api/campaigns/:id', (req, res) => {
//   request('http://localhost:4000/api/campaigns/1', (err, response, body) => {
//     const pledge_events = ['gamesetup', 'faceoff', 'goal', 'shotsaved', 'hit', 'penalty', 'assist'];
//     const pledge_events_array = [];

//     let gameObject = JSON.parse(body);

//     gameObject.periods.forEach(function(period) {
//       period.events.forEach(function(event) {
//         if (pledge_events.includes(event.event_type)) {
//           pledge_events_array.push("Time " + event.clock + ": " + event.description);
//         }
//       })
//     })
//     console.log("test pledge", pledge_events_array)
//     res.send(pledge_events_array[pledge_events_array.length-1])
//   })
// });

app.get('/api/schedule', (req, res) => {
  request('http://localhost:4000/api/schedule', (err, response, body) => {
    let scheduleParsed = JSON.parse(body);
    scheduleParsed.games.forEach(function(game) {
      if (game.home.name === 'Ottawa Senators' || game.away.name === 'Ottawa Senators') {
        console.log('===============')
        console.log('Game ID: ', game.id);
        console.log('Game Date: ', game.scheduled);
        console.log('Game Away Team: ', game.away.name);
        console.log('Game Home Team: ', game.home.name);
      }
    })
    res.send(scheduleParsed);
  })
});

app.get('/api/campaigns/:id/hometeam', (req, res) => {
  request('http://localhost:4000/api/campaigns/1/hometeam', (err, response, body) => {
    let hometeamParsed = JSON.parse(body);
    hometeamParsed.players.forEach(function(player) {
      console.log('Home Player: ', player.full_name);
    })
    res.send(hometeamParsed);
  })
});

app.get('/api/campaigns/:id/awayteam', (req, res) => {
  request('http://localhost:4000/api/campaigns/1/awayteam', (err, response, body) => {
    let awayteamParsed = JSON.parse(body);
    awayteamParsed.players.forEach(function(player) {
      console.log('Away Player: ', player.full_name);
    })
    res.send(awayteamParsed);
  })
});

// ============== Sockets ==================

// io.on('connection', function (socket) {
//   request('http://localhost:4000/api/campaigns/1', (err, response, body) => {
//     const pledge_events = ['gamesetup', 'faceoff', 'goal', 'shotsaved', 'hit', 'penalty', 'assist'];

//     let gameObject = JSON.parse(body);

//     let filteredEvents = gameObject.periods.reduce(function (acc, period) {
//       return acc.concat(period.events);
//     }, []).filter(function (event) {
//       return pledge_events.includes(event.event_type);
//     });

//     let pledge_events_array = filteredEvents.map(function (event) {
//       return 'Time ' + event.clock + ': ' + event.description;
//     });

//     pledge_events_array.forEach(function (event_string, index) {
//       (function (event_string, delay) {
//         setTimeout(function () {
//         socket.emit('news', {event: event_string})
//       }, delay);
//       })(event_string, (index + 1) * 1000);

//     });
//   });
// });


// let gameObject = JSON.parse(body);

//     gameObject.periods.forEach(function(period) {
//       period.events.forEach(function(event) {
//         if (pledge_events.includes(event.event_type)) {
//           pledge_events_array.push("Time " + event.clock + ": " + event.description);
//         }
//       })
//     })
//     console.log("test pledge", pledge_events_array)
//     res.send(pledge_events_array[pledge_events_array.length-1])
//   })

let p = 0;
let e = 0;

function shouldAdvancePeriod(gameRightNow) {
  return gameRightNow.periods[p].events.length >= gameRightNow.periods[p].events.length && p < gameRightNow.periods.length - 1;
}

function pollGame() {
  console.log("e", e)
  console.log('p', p)
  request('http://localhost:4000/api/campaigns/1', (err, response, body) => {
    const filter_events = ['goal', 'shotsaved', 'hit', 'penalty', 'assist'];
    let gameData = JSON.parse(body)
    const gameRightNow = Object.assign({}, gameData);
    let period_length = gameData.periods.length
    let length = gameData.periods[p].events.length
    let gameEvent = gameData.periods[p].events[length - 1]
    let gameEventType = gameData.periods[p].events[length - 1].event_type

    if (filter_events.includes(gameEventType)){
      let gameEventTypeDescription = gameData.periods[p].events[length - 1].description
      let gameEventTypeClock = gameData.periods[p].events[length - 1].clock
      let timeEvent = (gameEventTypeClock + " : " + gameEventTypeDescription)
      io.emit('game-event', timeEvent);
    }
    if (shouldAdvancePeriod(gameRightNow)) {
      p += 1;
      e = 0;
    } else {
       e += 1;
    }
    setTimeout(pollGame, 500);
  });
}

pollGame();

server.listen(app.get('port'), (err) => {
 if (err) throw err;
 console.log(`MOTB server running on port ${app.get('port')}`);
});
