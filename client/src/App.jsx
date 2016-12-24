import React, {Component} from 'react';

let dataArray = []
let newTotalPledges = []
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: [],
      pledges: [],
      leaderboard: [
        {user: 'Homer',
         totalAmountOwed: 0
       },
       {user: 'Peter',
        totalAmountOwed: 0
      }
      ]
    }
  }

  get onSocketData()
  {
    return data => {
      dataArray.push(data)

      if(!this.state || !this.state.pledges) { return; }

      this.state.pledges.forEach((user) => {
        console.log("user", user)
        user.pledged.forEach((pledge) => {
          console.log("pledge", pledge)

          console.log("pledge owe", pledge.owes)

          if(data.includes(pledge.pledge_event)){
            newTotalPledges = user.totalPledges.push(pledge.pledge_amount)

            pledge.occurance = pledge.occurance + 1;

            pledge.owes = pledge.occurance * pledge.pledge_amount
            console.log("pledge OWE", pledge.owes)
            console.log("pledge Occ", pledge.occurance)
            this.setState({occurance : pledge.occurance});
            this.setState({owes : pledge.owes});

            // console.log(this.state.pledges)
          }
        })
      })
this.setState({totalPledges: newTotalPledges})
      this.setState({game : dataArray});
      // console.log(this.state.pledges)
    };
  }

  componentDidMount() {
    fetch('/initialState')
      .then(response => response.json())
      .then(data => {
        // console.log('Got initial data from server', data);
        this.setState(data);
        this.props.socket.on('game-event', this.onSocketData);
      })
  }

  componentWillUnmount() {
    this.props.socket.removeListener('game-event', this.onSocketData);
  }

  flip() {
    $('.card').toggleClass('flipped');
  }

  render() {
    return (
      <div>
        <div class="leaderboard">
          <h1>Leaderboard</h1>
            <ul>
              {this.state.pledges.map(total =>
              <li> {total.username}, {total.totalPledges.reduce(function(a, b) {
                return a + b;
              }, 0)}
              </li>
              )}
            </ul>
        </div>


        <section class="container">
          <div class="card" onclick="flip()">
            <div class="front">
              <h1>Pledges</h1>
                <ul>
                {this.state && this.state.pledges && this.state.pledges.map(pledge =>
                  pledge.pledged.map(userPledge =>
                    <li>{pledge.username}: Event: {userPledge.pledge_event}, Amount: {userPledge.pledge_amount}, Occurance: {userPledge.occurance}, Owes: {userPledge.owes} </li>
                    )
                  )}
                </ul>
            </div>

             <div class="back">
              <h1>Game Feef</h1>
                <ul>
                  {this.state && this.state.game && this.state.game.map(event =>
                  <li> {event} </li>
                  )}
                </ul>
             </div>
          </div>
        </section>
      </div>
    );
  }
}
export default App;
