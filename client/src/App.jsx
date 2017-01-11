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
      dataArray.unshift(data)
      if(!this.state || !this.state.pledges) { return; }
      this.state.pledges.forEach((user) => {
        user.pledged.forEach((pledge) => {
          if(data.includes(pledge.pledge_event)){
            let $toastContent = $(`<span>${pledge.username} owes $${pledge.pledge_amount} for "${pledge.pledge_event}"</span>`);
            Materialize.toast($toastContent, 5000, 'green');
            newTotalPledges = user.totalPledges.push(pledge.pledge_amount)
            pledge.occurance = pledge.occurance + 1;
            pledge.owes = pledge.occurance * pledge.pledge_amount;
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
    // console.log("if I were to fetch, the campaign I'd be fetching would be", this.props.campaign_id);
    fetch(`/campaigns/${this.props.campaign_id}/pledges/`)
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
      <div className="react-main">
          <div className="flip-board">
              <FlipCard
                disabled={true}
                flipped={this.state.isFlipped}
                onFlip={this.handleOnFlip}
              >
            <div className="leaderboard">
              <div className="front">
                <button className="flip-button btn flip" type="button" ref="frontButton" onClick={this.showBack}>Pledges
                  <i className="fa fa-reply fa-1x fa-flip-horizontal fa-fw button-cycle"></i>
                </button>
                  <div className="name-head name-head-left">Money Board</div>
                    <div className="leaderboard-data">
                      <ul className="leaderboard-content collection">
                        {this.state.pledges.map(total =>
                        <li className="leaderboard-user collection-item">
                          <div>
                            <span className="username">{total.username}</span> owes:
                              <div className="secondary-content user-owes">
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
                <button className="flip-button btn flip" type="button" ref="backButton" onClick={this.showFront}>Money Board
                  <i className="fa fa-reply fa-1x fa-flip-horizontal fa-fw button-cycle"></i>
                </button>
                  <div className="name-head name-head-left-pledge">Pledges</div>
                    <div className="pledge-data">
                      <ul className="pledge-content collection">
                        {this.state && this.state.pledges && this.state.pledges.map(pledge =>
                          pledge.pledged.map(userPledge =>
                        <li className="user-pledge-data collection-item">
                          <span className="username">{userPledge.username}</span>
                            <br></br> Pledges: <strong>${userPledge.pledge_amount}</strong>
                            <br></br> For event: "{userPledge.pledge_event}"
                            <br></br> Occurances: <strong>{userPledge.occurance}</strong>
                            <br></br> Owes: <strong>${userPledge.owes}</strong>
                        </li>
                         )
                        )}
                      </ul>
                    </div>
              </div>
            </div>
              </FlipCard>
          </div>


          <div className="game-feed">
            <div className="panel">
              <div className="name-head">Game Feed</div>
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

      </div>
    );
  }
}
export default App;
