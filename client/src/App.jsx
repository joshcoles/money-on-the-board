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
      leaderboard: []
    };
    this.handleOnFlip = this.handleOnFlip.bind(this);
    this.showBack = this.showBack.bind(this);
    this.showFront = this.showFront.bind(this);
  }

  get onSocketData(){
    return data => {
      dataArray.push(data)
      if(!this.state || !this.state.pledges) { return; }
      this.state.pledges.forEach((user) => {
        user.pledged.forEach((pledge) => {
          if(data.includes(pledge.pledge_event)){
            let $toastContent = $(`<span>${pledge.username} owes $${pledge.pledge_amount}</span>`);
            Materialize.toast($toastContent, 2000, 'green');
            newTotalPledges = user.totalPledges.push(pledge.pledge_amount)
            pledge.occurance = pledge.occurance + 1;
            pledge.owes = pledge.occurance * pledge.pledge_amount
            this.setState({
              occurance : pledge.occurance,
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
      console.dir(data)
      this.setState(data);
      this.props.socket.on('game-event', this.onSocketData);
    })
  }
  componentWillUnmount() {
    this.props.socket.removeListener('game-event', this.onSocketData);
  }
  // Flip for Leaderboard and Pledges //
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
                <button className="flip-button" type="button" ref="frontButton" onClick={this.showBack}>
                  <i className="fa fa-refresh fa-1x fa-fw button-cycle"></i>
                </button>
                  <h3>The Board</h3>
                    <div className="leaderboard-data">
                      <ul className="leaderboard-content collection">
                        {this.state.pledges.map(total =>
                        <li className="leaderboard-user collection-item">
                          <div>
                            <span className="username">{total.username}</span>
                              <div className="secondary-content">
                              ${total.totalPledges.reduce(function(a, b) {
                              return a + b;
                            }, 0)}
                              </div>
                          </div>
                        </li>
                        )}
                      </ul>
                    </div>
              </div>
            </div>
            <div className="pledges">
              <div className="back">
                <button className="flip-button" type="button" ref="backButton" onClick={this.showFront}>
                  <i className="fa fa-refresh fa-1x fa-fw button-cycle"></i>
                </button>
                  <h3>Pledges</h3>
                    <div className="pledge-data">
                      <ul className="pledge-content collection">
                        {this.state && this.state.pledges && this.state.pledges.map(pledge =>
                          pledge.pledged.map(userPledge =>
                        <li className="user-pledge-data collection-item">
                          <span className="username">{userPledge.username}</span>
                            <br></br> Event: {userPledge.pledge_event}
                            <br></br> Amount: {userPledge.pledge_amount}
                            <br></br> Occurance: {userPledge.occurance}
                            <br></br> Owes: ${userPledge.owes}
                        </li>
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
              <h3>Game Feed</h3>
              <div className="panel-content">
                <Scrollbars>
                  <ul className="game-content collection">
                    {this.state && this.state.game && this.state.game.map(event =>
                    <li className="collection-item"> {event} </li>
                    )}
                  </ul>
                </Scrollbars>
              </div>
            </div>
          </div>
        </row>
      </div>
    );
  }
}
export default App;
