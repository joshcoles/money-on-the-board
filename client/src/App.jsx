import React, {Component} from 'react';
// let eventArray = []
// let test = 'Nazem Kadri won faceoff'
// let pledgeArray = ['Nazem Kadri won faceoff', 'Shot on goal by Mitchell Marner', 'Matt Martin credited with hit']
let dataArray = []

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: []
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

      dataArray.push(data)

      this.setState({game : dataArray});
      console.log("dataArray", dataArray)
    });

  }


   // <ol>
   //       {this.state.game.periods.reverse().map(period =>
   //         period.events.reverse().map(event =>
   //           <li>{event.description}</li>
   //         )
   //       )}
   //     </ol>

  render() {
    return (
      <div>
       <h1>Money On The Board</h1>
       <ol>
         {this.state.game.map(event =>
          <li> {event} </li>
          )}
       </ol>

     </div>
    );
  }
}
export default App;
