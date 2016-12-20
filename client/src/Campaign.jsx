import React, {Component} from 'react';

class Campaign extends Component {

  render() {
    return (
      <ul class="collection">
        <li class="collection-item avatar">
          <i class="material-icons circle">folder</i>
          <span class="title">Title</span>
          <p>First Line <br></br>
             Second Line
          </p>
          <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
        </li>
      </ul>
    );
  }
}

export default Campaign;
