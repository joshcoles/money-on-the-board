import React, {Component} from 'react';

let dataArray = []

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: [],
      pledges: [{
        user_id: 1,
        username: "Homer Simpon",
        pledged: [
          {id: 'i48dj', pledge_amount: 2.00, pledge_event: 'Matt Martin credited with hit', occurance: 0, owes: 0.00},
          {id: 'is820', pledge_amount: 5.00, pledge_event: 'Goal scored by Auston Matthews', occurance: 0, owes: 0.00},
          {id: 'zo09s', pledge_amount: 1.00, pledge_event: 'saved by Frederik Andersen',occurance: 0, owes: 0.00}
        ]
      }, {
        user_id: 2,
        username: "Peter Griffin",
        pledged:[
          {id: 'v8ud8', pledge_amount: 2.00, pledge_event: 'Goal scored by Derick Brassard', occurance: 0, owes: 0.00},
          {id: 'x29in', pledge_amount: 5.00, pledge_event: 'Zack Smith credited with hit', occurance: 0, owes: 0.00},
          {id: 'asdf8', pledge_amount: 1.00, pledge_event: 'Goal scored by Erik Karlsson', occurance: 0, owes: 0.00}
        ]
      }]
    };
  }

  componentDidMount() {
    this.props.socket.on('game-event', data => {

      dataArray.push(data)

      this.state.pledges.forEach((user) => {
        user.pledged.forEach((pledge) => {
          if(data.includes(pledge.pledge_event)){
            pledge.occurance = pledge.occurance + 1;
            pledge.owes = pledge.occurance * pledge.pledge_amount
            this.setState({occurance : pledge.occurance});
            this.setState({occurance : pledge.owes});
          }
        })
      })
      this.setState({game : dataArray});
      console.log(this.state.pledges)
    });

  }

  render() {
    return (
      <div>
      <h1>Pledges</h1>
      <ul>
      {this.state.pledges.map(pledge =>
        pledge.pledged.map(userPledge =>
          <li>{pledge.username}: Event: {userPledge.pledge_event}, Amount: {userPledge.pledge_amount}, Occurance: {userPledge.occurance}, Owes: {userPledge.owes} </li>
          )
        )}
      </ul>


      <h1>Game Feef</h1>
        <ul>
          {this.state.game.map(event =>
          <li> {event} </li>
          )}
        </ul>

     </div>
    );
  }
}
export default App;
