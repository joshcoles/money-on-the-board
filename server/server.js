
//=========================================//
//=========== DEPENDENCIES ================//
//=========================================//

require('dotenv').config();
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
const mailgun = require('mailgun-js')({
                  apiKey: process.env.MAILGUN_KEY,
                  domain: process.env.MAILGUN_DOMAIN
                });


const home = require('../mock-api/sample-data/sportsradar-roster-ottawa.json');
const away = require('../mock-api/sample-data/sportsradar-roster-toronto.json');

const util = require('util');

const inspect = (o, d = 1) => { console.log(util.inspect(o, { colors: true, depth: d }))};


app.set('port', process.env.port || 8080);
app.set('view engine', 'ejs');

// ============== Middleware =================

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'purplecatattack',
  keys: ['toranto', 'bimbimbop']
}));


// function that fixed urls that don't begin with 'http://''
function fixURL(originalURL) {
  if (!(originalURL.includes("://"))) {
    originalURL = "http://" + originalURL;
  }
  return originalURL;
}

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
  if(!user) { done(new Error("User is not present")); }
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db('users').where({id}).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = !!req.user;
  next();
})

//=========================================//
//============== Routes ===================//
//=========================================//

app.get('/', (req, res) => {
  inspect(res.locals);
  res.render('landing-page');
});

//=========================================//
//============ SEED PLEDGES ===============//
//======== CURRENTLY NOT IN USE ===========//
//=========================================//

app.get('/seedpledges', (req, res) => {
  res.json({
    pledges: [{
      user_id: 1,
      totalPledges: [],
      pledged: [
        {id: 'i48dj', pledge_amount: 2.00, pledge_event: 'Matt Martin credited with hit', occurance: 0, owes: 0.00},
        {id: 'is820', pledge_amount: 5.00, pledge_event: 'Goal scored by Auston Matthews', occurance: 0, owes: 0.00},
        {id: 'zo09s', pledge_amount: 1.00, pledge_event: 'saved by Frederik Andersen',occurance: 0, owes: 0.00}
      ]
    }, {
      user_id: 2,
      totalPledges: [],
      pledged:[
        {id: 'v8ud8', pledge_amount: 2.00, pledge_event: 'Goal scored by Derick Brassard', occurance: 0, owes: 0.00},
        {id: 'x29in', pledge_amount: 5.00, pledge_event: 'Zack Smith credited with hit', occurance: 0, owes: 0.00},
        {id: 'asdf8', pledge_amount: 1.00, pledge_event: 'Goal scored by Erik Karlsson', occurance: 0, owes: 0.00}
      ]
    }]
  });
});

//=========================================//
//============== DB PLEDGES ===============//
//=========== CURRENTLY IN USE ============//
//=========================================//

app.get('/pledges', (req, res) => {
  let allPledges = {
    pledges: []
  }
  db.select().from('pledges').returning().then(result => {
    let pledgingUsers = result.forEach(pledge => {
      console.log(pledge);
      allPledges.pledges.push({
        user_id: pledge.user_id,
        username: pledge.username,
        totalPledges: [],
        pledged: [
          {
            id: pledge.id,
            username: pledge.username,
            pledge_amount: parseInt(pledge.money),
            pledge_event: pledge.event_string,
            occurance: 0,
            owes: 0
          }
        ]
      });
    });
    res.json(allPledges)
  });
})

//=========================================//
//============== DB PLEDGES ===============//
//============== Test Version =============//
//=========================================//

app.get('/campaigns/:id/pledges', (req, res) => {
  let allPledges = {
    pledges: []
  }
  db.select().from('pledges').where({id: req.params.id}).returning().then(result => {
    let pledgingUsers = result.forEach(pledge => {
      console.log(pledge);
      allPledges.pledges.push({
        user_id: pledge.user_id,
        username: pledge.username,
        totalPledges: [],
        pledged: [
          {
            id: pledge.id,
            username: pledge.username,
            pledge_amount: parseInt(pledge.money),
            pledge_event: pledge.event_string,
            occurance: 0,
            owes: 0
          }
        ]
      });
    });
    res.json(allPledges)
  });
})



//=========================================//
//========== SIGN UP NEW USERS ============//
//=========================================//

app.get('/users/new', (req, res) => {
  res.render('signup');
});

app.post('/users/new', (req, res) => {
  console.log("Req: ", req)
  if (req.body.password === req.body.confirm_password) {
    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    let user = { username: username, password: password, email: email };
    db.insert([user])
    .into('users')
    .returning('id').then((userIDs) => {
      user.id = userIDs[0];
      req.login(user, (err) => {
        if (!err) {
          res.redirect('/');
        } else {
          res.send("ERROR");
        }
      });
    });
  } else {
    res.send("You goofed!");
  }
});

//=========================================//
//========== LOGIN/LOGOUT USERS ===========//
//=========================================//

app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//=========================================//
//============ CREATE PLEDGES =============//
//=========================================//

app.get('/campaigns/:id/pledges/new', (req, res) => {
  let campaign_id = req.params.id;
  let away_roster = [];
  let home_roster = [];
  db.select('game_id').from('campaigns').where({id: campaign_id})
  .then(game => {
    let game_id = game[0].game_id
    db.select('game_uuid').from('games').where({id: game_id})
    .then(gameUUID => {
      let game_uuid = gameUUID[0].game_uuid
      request('http://localhost:4000/api/schedule', (err, response, body) => {
        let gameObject = JSON.parse(body)
        gameObject.games.forEach((game) => {
          if (game.id === game_uuid) {
            let away_id = game.away.id
            let away_name = game.away.name
            let home_id = game.home.id
            let home_name = game.home.name
            request(`http://localhost:4000/api/campaigns/team/${away_id}`, (err, response, body) => {
              let awayObject = JSON.parse(body)
              awayObject.players.forEach((player) => {
                away_roster.push({id: player.id, name: player.full_name})
              })
            })
            request(`http://localhost:4000/api/campaigns/team/${home_id}`, (err, response, body) => {
              let awayObject = JSON.parse(body)
              awayObject.players.forEach((player) => {
                home_roster.push({id: player.id, name: player.full_name})
              })
  res.render('pledge-new', {campaign_id, away_roster, home_roster, away_id, home_id, away_name, home_name});
            })
          }
        })
      })
    })
  })
});

app.post('/campaigns/:id/pledges/new', (req, res) => {
  let teamID = req.body.team;
  let pledgeTeam = req.body.team;
  let pledgePlayer = req.body.player;
  let pledgeAmount = req.body.pledge.slice( 1 );
  let inGameEvent = req.body.inGameEvent;
  let user_id = res.locals.currentUser.id;
  let username = res.locals.currentUser.username;
  let campaign_id = req.params.id;

  request(`http://localhost:4000/api/campaigns/team/${teamID}`, (err, response, body) => {
    team = JSON.parse(body)
    team.players.forEach((player) => {
      if(player.id === pledgePlayer) {
        eventPlayerName = player.full_name
      }
    })
    switch (inGameEvent) {
       case '6':
       eventString = `Goal scored by ${eventPlayerName}`;
       break;
       case '9':
       eventString = `${eventPlayerName}`;
       break;
       case '7':
       eventString = `${eventPlayerName} 5 minutes for Fighting`;
       break;
       case '8':
       eventString = `assisted by ${eventPlayerName}`;
       break;
       case '4':
       eventString = `${eventPlayerName} credited with`;
       break;
       case '5':
       eventString = `Penalty to ${eventPlayerName}`;
       break;
       case '2':
       eventString = `${eventPlayerName} won faceoff`;
       break;
       case '3':
       eventString = `saved by ${eventPlayerName}`;
       break;
    }
    db.insert([{
      player_uuid: pledgePlayer,
      team_uuid: pledgeTeam,
      money: pledgeAmount,
      in_game_event_id: inGameEvent,
      user_id: user_id,
      campaign_id: campaign_id,
      event_string: eventString,
      username: username}
    ])
    .into('pledges')
    .then((result) => {
      console.log("Pledge insert result", result);
    })
  })
  res.redirect(`/campaigns/${req.params.id}`);
});

//=========================================//
//======= SHOW/CREATE CAMPAIGNS ===========//
//=========================================//

app.get('/campaigns', (req, res) => {
  db.select('title', 'id', 'charity_url', 'charity_name', 'image_url', 'description').from('campaigns')
  .then(campaigns => {
    res.render('campaign-list', {campaigns});
  });
});

app.get('/campaigns/new', (req, res) => {
  res.render('campaign-new');
});

app.post('/campaigns/new/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/campaigns/new');
});


app.post('/campaigns', (req, res) => {
  console.log('***Form Submitted***')
  console.log('request body: ', req.body)
  let game = req.body.game;
  let campaign_name = req.body.campaign_name;
  let charity_name = req.body.charity_name;
  let charity_url = fixURL(req.body.charity_url);
  let hashtag = req.body.hashtag;
  let image_url = req.body.image_url;
  let description = req.body.description;
  let currentUser = res.locals.currentUser;
  console.log("Game: " + game);
  console.log("Campaign name: " + campaign_name);
  console.log("Charity name: " + charity_name);
  console.log("Charity url: " + charity_url);
  console.log("Hashtag: " + hashtag);
  console.log("Description: " + description);
  console.log("image_url: " + image_url);
  console.log("CurrentUser.id: " + currentUser.id);

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
      user_id: currentUser.id,
      image_url: image_url,
      description: description,
    }])
    .into('campaigns')
    .returning('id')
    .then((result) => {
      console.log("campaign insert result", result);
      if (result.length === 1) {
        const campaign_id = result[0];
        let email_data = {
          from: 'MOTB TEAM <postmaster@sandboxaa6735332e75406fa7971145060d2387.mailgun.org>',
          to: currentUser.email,
          subject: 'Your Campaign Details',
          text: `Hi ${currentUser.username}!\
          Thank you for making a campaign with Money on the Board! Here are the details about the campaign:\
          Twitter Account: ${hashtag}\
          Title: ${campaign_name}\
          Charity Name: ${charity_name}\
          Donation Link: ${charity_url}\
          description: ${description}\
          Sharable Link: http://localhost:8080/campaigns/${result[0]}`
        };
        mailgun.messages().send(email_data, (error, body) => {
          console.log(body);
        });
        res.redirect(`campaigns/${campaign_id}`);
      } else {
        console.error("number of found campaigns =", result.length);
        res.redirect('/campaigns/new');
      }
    })
    .catch((error) => {
      console.error("error when inserting campaign", error);
      res.redirect('/campaigns/new');
    });
  });
});

app.post('/campaigns/:id', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(`/campaigns/${req.params.id}/pledges/new`);
});


//=========================================//
//====== SHOW CAMPAIGN REACT PAGE =========//
//=========================================//

app.get('/campaigns/:id', (req, res) => {
  let campaign_id = req.params.id
  db.select().from('campaigns').where({id: campaign_id}).then(data => {
    console.log(data)
    let handle = data[0].handle
    let charity_name = data[0].charity_name
    let title = data[0].title
    let image_url = data[0].image_url
    let description = data[0].description
    let charity_url = data[0].charity_url
    res.render('index', {campaign_id, handle, charity_name, title, image_url, description, charity_url})
  })
  pollGame();
});


//=========================================//
//============ HANDLE API CALLS ===========//
//=========================================//
app.get('/api/schedule', (req, res) => {
  request('http://localhost:4000/api/schedule', (err, response, body) => {
    let scheduleParsed = JSON.parse(body);
    scheduleParsed.games.forEach((game) => {
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
    hometeamParsed.players.forEach((player) => {
      console.log('Home Player: ', player.full_name);
    })
    res.send(hometeamParsed);
  })
});

app.get('/api/campaigns/:id/awayteam', (req, res) => {
  request('http://localhost:4000/api/campaigns/1/awayteam', (err, response, body) => {
    let awayteamParsed = JSON.parse(body);
    awayteamParsed.players.forEach((player) => {
      console.log('Away Player: ', player.full_name);
    })
    res.send(awayteamParsed);
  })
});

//=========================================//
//============== SOCKETS ==================//
//=========================================//

let p = 0;
let e = 0;

function shouldAdvancePeriod(gameRightNow) {
  return gameRightNow.periods[p].events.length >= gameRightNow.periods[p].events.length && p < gameRightNow.periods.length - 1;
}

function endGame(gameRightNow) {
  let length = gameRightNow.periods[p].events.length
  return gameRightNow.periods[p].events[length - 1].event_type === 'endperiod' && gameRightNow.periods[p].events[length - 1].description === 'End of 1st OT.'
  // return gameRightNow.periods[p].events[length - 1].event_type === 'endperiod' && gameRightNow.deleted_events --- review for later - deleted.events is not tied to event or event_type
}

function pollGame() {
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
    if (endGame(gameRightNow)) {

      console.log("Game Over");
    } else {
    setTimeout(pollGame, 500);
    }
  });
}



server.listen(app.get('port'), (err) => {
 if (err) throw err;
 console.log(`MOTB server running on port ${app.get('port')}`);
});
