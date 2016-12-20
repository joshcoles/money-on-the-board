import React, {Component} from 'react';
import game from '../../mock-api/sample-data/sportsradar-play-by-play-sens-vs-leafs.json';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: ''
    };
  }

  componentDidMount() {
    const pledge_events = ['goal', 'shotsaved', 'hit', 'penalty', 'assist'];
    const pledge_events_array = [];

    game.periods.forEach(function(period) {
        console.log(period.sequence)

      period.events.forEach(function(event) {
        if (pledge_events.includes(event.event_type)) {
          pledge_events_array.push("Time " + event.clock + ": " + event.description);
        }
      })
    })

    let i = 0;
    setInterval(function() {
      if (i === pledge_events_array.length){
        return
      }
      console.log(pledge_events_array[i])
      i++
    }, 2000);

    this.setState({events: pledge_events_array});
    
  }

}
 export default Game;
