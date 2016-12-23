import React, {Component} from 'react';

let dataArray = []

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: [],
      pledges: []
    }
  }

  get onSocketData()
  {
    return data => {
      dataArray.push(data)

      if(!this.state || !this.state.pledges) { return; }

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
    };
  }

  componentDidMount() {
    fetch('/initialState')
      .then(response => response.json())
      .then(data => {
        console.log('Got initial data from server', data);
        this.setState(data);
        this.props.socket.on('game-event', this.onSocketData);
      })
  }

  componentWillUnmount() {
    this.props.socket.removeListener('game-event', this.onSocketData);
  }

  render() {
    return (
      <div>
      <h1>Pledges</h1>
      <ul>
      {this.state && this.state.pledges && this.state.pledges.map(pledge =>
        pledge.pledged.map(userPledge =>
          <li>{pledge.username}: Event: {userPledge.pledge_event}, Amount: {userPledge.pledge_amount}, Occurance: {userPledge.occurance}, Owes: {userPledge.owes} </li>
          )
        )}
      </ul>


      <h1>Game Feef</h1>
        <ul>
          {this.state && this.state.game && this.state.game.map(event =>
          <li> {event} </li>
          )}
        </ul>

     </div>
    );
  }
}
export default App;
