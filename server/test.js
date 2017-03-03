const request = require('request');
const express = require('express');
const app = express();
const server = require('http').Server(app);

let liveGameData = 'https://statsapi.web.nhl.com/api/v1/game/2016020933/feed/live';
let period;
let plays;
let description;
let timeRemaining;

function pollGame() {
  request(liveGameData, function (error, response, body) {
      let  liveGame = JSON.parse(body)
      const gameRightNow = Object.assign({}, liveGame);
      console.log(gameRightNow.gameData.status.detailedState)
       //if the game is in preview, just wait and poll the game in 2 minuties
      if (gameRightNow.gameData.status.detailedState == ("Preview" || "Pre-Game")) {
        console.log("game not started")
        setTimeout(pollGame, 30000);
      }
      //if the game is in progress, get all the events and console log them
      else if (gameRightNow.gameData.status.detailedState == "In Progress") {
        let plays = gameRightNow.liveData.plays.allPlays;
        plays.forEach((play) => {
          let description = play.result.description
          let period = play.about.period
          let timeRemaining = play.about.periodTimeRemaining
          console.log("Period: " + period + " Time remainging: " + timeRemaining + " Event: " + description)
        })
        setTimeout(pollGame, 30000);
      }

      //if the game is over, say its over.
      else {
        console.log("game over")
        return
      }
  })
};

pollGame();
