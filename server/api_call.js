const request = require('request');

let teamUrl = 'http://statsapi.web.nhl.com/api/v1/teams';
let teams = [];
let players = [];
let rosterUrl = [];

request(teamUrl, (error, response, body) => {
  if(!error && response.statusCode == 200) {
    let teamListObj = JSON.parse(body);
    let teamList = teamListObj.teams;
    // console.log(teamList);
    teamList.forEach((team) => {
      let teamInfo = {
        team_uuid: team.id,
        full_name: team.name,
        team_name: team.teamName,
        abbreviation: team.abbreviation,
        roster_url: 'https://statsapi.web.nhl.com/api/v1/teams/' + team.id + '/roster'
      }
      teams.push(teamInfo);
      rosterUrl.push(teamInfo.roster_url);
      // console.log(teamInfo);
    });
    // console.log(teams);
    // console.log(rosterUrl);
    rosterUrl.forEach((roster) => {
      request(roster, (error, response, body) => {
        if(!error && response.statusCode == 200) {
          let rosterTeam = JSON.parse(body);
          rosterTeam.roster.forEach((player) => {
            let team_id = roster.slice(42, -7);
            let playerInfo = {
              player_uuid: player.person.id,
              full_name: player.person.fullName,
              jersey_number: player.jerseyNumber,
              position: player.position.abbreviation,
              team_id: team_id
            }
            players.push(playerInfo);
            console.log(playerInfo);
          });
        };
      });
      // console.log(roster);
    });
  };
});
