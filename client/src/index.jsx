// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import io from 'socket.io-client';

const socket = io.connect();

ReactDOM.render(<App socket={socket} />, document.getElementById('react-root'));
