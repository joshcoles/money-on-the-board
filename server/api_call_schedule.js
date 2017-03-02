const request = require('request');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const db = require('./db');
const pg = require('pg');
const config = require('./knexfile.js');
const knex = require('knex')(config);

knex('games').del().then(count) => {
  console.log(count);
}).finally(() => {
  knex.destroy();
});

let scheduleURL = 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=2016-10-12&endDate=2017-04-20';

let gameInfo = [];

request(scheduleURL, function (error, response, body) {
 if (!error && response.statusCode == 200) {
   let schedule = JSON.parse(body)
   let gameDates = schedule.dates
     // creating an object that has all relevant game information
     // creating the link that will allow access to the game events data
   gameDates.forEach((date) => {
     date.games.forEach((game) => {
       let gameData = {
         game_uuid : game.gamePk,
         link : 'https://statsapi.web.nhl.com/api/v1/game/' + game.gamePk + '/feed/live?site=en_nhl',
         game_date : game.gameDate,
         state : game.status.abstractGameState,
         home_team_id : game.teams.home.team.id,
         home_team_fullname : game.teams.home.team.name,
         away_team_id : game.teams.away.team.id,
         away_team_fullname : game.teams.away.team.name,
       }
       gameInfo.push(gameData);
       db.insert([gameData])
       .into('games')
       .then((result) => {
         console.log("Games insterted", result);
       });
     })
   });
 // console.log(gameInfo)
  }
});
