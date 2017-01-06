import React, {Component} from 'react';
import FlipCard from 'react-flipcard';
import { Scrollbars } from 'react-custom-scrollbars';

let dataArray = []
let newTotalPledges = []

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
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
    };
    this.handleOnFlip = this.handleOnFlip.bind(this);
    this.showBack = this.showBack.bind(this);
    this.showFront = this.showFront.bind(this);
  }

  get onSocketData()
  {
    return data => {
      dataArray.push(data)

      if(!this.state || !this.state.pledges) { return; }

      this.state.pledges.forEach((user) => {
        user.pledged.forEach((pledge) => {
          if(data.includes(pledge.pledge_event)){
            newTotalPledges = user.totalPledges.push(pledge.pledge_amount)
            pledge.occurance = pledge.occurance + 1;
            pledge.owes = pledge.occurance * pledge.pledge_amount
            this.setState({
              occurance : pledge.occurance
            });
            this.setState({
              owes : pledge.owes
            });
          }
        })
      })
      this.setState({
        totalPledges: newTotalPledges
      })
      this.setState({
        game : dataArray
      });
    };
  }

  componentDidMount() {
    fetch('/pledges')
      .then(response => response.json())
      .then(data => {
        this.setState(data);
        this.props.socket.on('game-event', this.onSocketData);
      })
  }

  componentWillUnmount() {
    this.props.socket.removeListener('game-event', this.onSocketData);
  }

  // Flip for Leaderboard and Pledges //
  // this in showBack and showFront are null

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip(flipped) {
    if (flipped) {
      ReactDOM.getDOMNode(this.refs.backButton).focus();
    }
  }

  render() {
    return (
      <div>
      <div className="">
        <row>
          <div className="col s12 m4 l4 flip-board">
          <div className="leaderboard-pledge">
           <FlipCard
              disabled={true}
              flipped={this.state.isFlipped}
              onFlip={this.handleOnFlip}
            >
            <div className="leaderboard">
              <div className="front">
                <button className="flip-button" type="button" ref="frontButton" onClick={this.showBack}> </button>
                  <h1>The Board</h1>
                    <div className="leaderboard-data">
                      <ul className="leaderboard-content">
                        {this.state.pledges.map(total =>
                        <li className="leaderboard-user">User: {total.username} ${total.totalPledges.reduce(function(a, b) {
                          return a + b;
                        }, 0)}
                        </li>
                        )}
                      </ul>
                    </div>
              </div>
            </div>

            <div className="pledges">
              <div className="back">
               <button className="flip-button" type="button" ref="backButton" onClick={this.showFront}> </button>
                  <h1>Pledges</h1>
                    <div className="pledge-data">

                        <ul className="pledge-content">
                        {this.state && this.state.pledges && this.state.pledges.map(pledge =>
                          pledge.pledged.map(userPledge =>
                            <li className="user-pledge-data">User: {userPledge.username} <br></br> Event: {userPledge.pledge_event}, Amount: {userPledge.pledge_amount}, Occurance: {userPledge.occurance}, Owes: ${userPledge.owes}</li>
                            )
                          )}
                        </ul>

                    </div>
              </div>
            </div>
           </FlipCard>
           </div>
          </div>
        </row>

          <row>

            <div className="game-feed">

              <div className="panel">
                <h1>Game Feed</h1>
                <div className="panel-content">
                  <Scrollbars>
                    <ul className="game-content">
                      {this.state && this.state.game && this.state.game.map(event =>
                      <li> {event} </li>
                      )}
                    </ul>
                  </Scrollbars>
                </div>
              </div>

          </div>

          </row>
      </div>
    </div>
    );
  }
}
export default App;
