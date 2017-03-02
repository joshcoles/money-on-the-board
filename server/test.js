const request = require('request');
const express = require('express');
const app = express();
const server = require('http').Server(app);

let liveGameData = 'https://statsapi.web.nhl.com/api/v1/game/2016020924/feed/live';
let period;
let plays;
let description;
let timeRemaining;

const filter_events = ['Faceoff', 'Giveaway', 'Blocked Shot', 'Takeaway', 'Hit', 'Shot', 'Goal', 'Penalty'];


function pollGame() {
request(liveGameData, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     let  liveGame = JSON.parse(body);
     const gameRightNow = Object.assign({}, liveGame);
     let state = gameRightNow.gameData.status.detailedState;
     console.log(state);
     if (state === "In Progress") {
       let plays = gameRightNow.liveData.plays.allPlays;
       plays.forEach((play) => {
        let event = play.result.event;
        if (filter_events.includes(event)) {
          let filteredEvent = event;
          let description = play.result.description;
          let period = play.about.period;
          let timeRemaining = play.about.periodTimeRemaining;
           console.log("Period: " + period + " Time remainging: " + timeRemaining + " Event: " + description)
        }
      })
      setTimeout(pollGame, 30000);
    } else if (state === "Preview" || "Pre-game") {
      console.log("game not started");
      setTimeout(pollGame, 30000);
      }
    }
  });
}

pollGame();
