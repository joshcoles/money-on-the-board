const request = require('request');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const db = require('./db');


let teamUrl = 'http://statsapi.web.nhl.com/api/v1/teams';
let teams = [];
let players = [];
let rosterUrl = [];

request(teamUrl, (error, response, body) => {
  if(!error && response.statusCode == 200) {
    let teamListObj = JSON.parse(body);
    let teamList = teamListObj.teams;
    teamList.forEach((team) => {
      let teamInfo = {
        team_uuid: team.id,
        team_fullname: team.name,
        team_name: team.teamName,
        team_abbreviation: team.abbreviation,
        roster_url: 'https://statsapi.web.nhl.com/api/v1/teams/' + team.id + '/roster'
      }
      teams.push(teamInfo);
      rosterUrl.push(teamInfo.roster_url);
      db.insert([teamInfo])
      .into('teams')
      .then((result) => {
        console.log("Team insterted", result);
      });
    });
    rosterUrl.forEach((roster) => {
      request(roster, (error, response, body) => {
        if(!error && response.statusCode == 200) {
          let rosterTeam = JSON.parse(body);
          rosterTeam.roster.forEach((player) => {
            let team_id = roster.slice(42, -7);
            let playerInfo = {
              player_uuid: player.person.id,
              player_name: player.person.fullName,
              player_jersey_number: player.jerseyNumber,
              player_position: player.position.abbreviation,
              team_id: team_id
            }
            players.push(playerInfo);
            db.insert([playerInfo])
            .into('players')
            .then((result) => {
              console.log("Players insterted", result);
            });
          });
        };
      });
    });
  };
})
