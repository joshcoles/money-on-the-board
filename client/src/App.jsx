import React, {Component} from 'react';
// let eventArray = []
// let test = 'Nazem Kadri won faceoff'
// let pledgeArray = ['Nazem Kadri won faceoff', 'Shot on goal by Mitchell Marner', 'Matt Martin credited with hit']


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {
        periods: []
      }
    };
  }

  componentDidMount() {

    // this.socket = io.connect('http://localhost:8080');
    // console.log('connecting to web socket');
    // this.socket.on('news', (data) => {
    //   let values = Object.values(data)
    //     pledgeArray.forEach((pledge) => {
    //       if (values[0].includes(pledge)) {
    //         this.setState({pledges: pledge})
    //       }
    //     })
    //     eventArray.push(values[0]);
    //     this.setState({events: eventArray});
    // });
    this.props.socket.on('game-event', data => {
      this.setState({game : data});
    });

  }

  render() {
    return (
      <div>
       <h1>Money On The Board</h1>
       <ol>
         {this.state.game.periods.reverse().map(period =>
           period.events.reverse().map(event =>
             <li>{event.description}</li>
           )
         )}
       </ol>
     </div>
    );
  }
}
export default App;
