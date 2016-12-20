import React, {Component} from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: ''
    };
  }

  componentDidMount() {
    let socket = io.connect('http://localhost:8080');
    console.log('connecting to web socket');
    socket.on('news', function (data) {
      console.log(data);
   // set as a new state
    });
  }



  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <p></p>
      </div>
    );
  }
}
export default App;
