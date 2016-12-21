import React, {Component} from 'react';
let eventArray = []
let test = 'Nazem Kadri won faceoff'
let pledgeArray = ['Nazem Kadri won faceoff', 'Shot on goal by Mitchell Marner', 'Matt Martin credited with hit']


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      pledges: ''
    };
  }

  componentDidMount() {

    this.socket = io.connect('http://localhost:8080');
    console.log('connecting to web socket');
    this.socket.on('news', (data) => {
      let values = Object.values(data)
        pledgeArray.forEach((pledge) => {
          if (values[0].includes(pledge)) {
            this.setState({pledges: pledge})
          }
        })
        eventArray.push(values[0]);
        this.setState({events: eventArray});
    });
  }

  render() {
    return (
      <div>
        <h1>Game Feed</h1>
        <h3>{this.state.pledges}</h3>
        <p>{this.state.events}</p>
      </div>
    );
  }
}
export default App;
