import React, { useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator,AmplifySignOut } from '@aws-amplify/ui-react'
// import FC from './components/function';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App)

