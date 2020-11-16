import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator,AmplifySignOut } from '@aws-amplify/ui-react'

Amplify.configure(awsconfig);

function App() {
  const [creativeUrlName, setCreativeUrlName] = React.useState('');
    const [guidName, setGuidName] = React.useState('');
    const [showName, setShowName] = React.useState('');
    const [showId, setShowId] = React.useState('');
    const [timeStamp, setTimeStamp] = React.useState('');
    const [podcastEpisodeName, setPodcastEpisodeName] = React.useState('');
    const [guidNames, setGuidNames] = React.useState([]);

    const styleObj = {
      fontSize: 14
  }

    const myInit = {
      body: {
          id: guidName,
          showname : showName,
          creativeurl: creativeUrlName,
          showid: showId,
          podcastepisodename:podcastEpisodeName,
          timestamp:timeStamp
          
      }, // replace this with attributes you have in your DB
  };


  // useEffect(() => {
  //   API.get("podcastAPI", "/creativeurl").then((creative) => console.log(creative));
  //   },[]);

    useEffect(() => {
      API.get("podcastAPI", "/creativeurl").then((creative) => {
          setGuidNames([...guidNames, ...creative]);
      });
      },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("podcastAPI", "/creativeurl", myInit).then(()=>{
      setGuidNames([...guidNames, {showid:showId,podcastepisodename:podcastEpisodeName,showname:showName,creativeurl:creativeUrlName,timestamp:timeStamp}])
    });
   };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={handleSubmit}>
        <input value = {showName} placeholder = 'Show Name' onChange={(e) => setShowName(e.target.value)}/>
        <input value = {creativeUrlName} placeholder = 'Audio Creative Url' onChange={(e) => setCreativeUrlName(e.target.value)}/>
        <input value = {showId} placeholder = 'Show ID' onChange={(e) => setShowId(e.target.value)}/>
        <input value = {podcastEpisodeName} placeholder = 'Podcast Episode Name' onChange={(e) => setPodcastEpisodeName(e.target.value)}/>
        
        <button>Add podcast audio url</button>
        </form>
        <ul>
        {guidNames.map((item,key) => (
          <li style={styleObj} key={key}>{item.id + ' = ' + item.creativeurl + ' = ' + item.showname + ' = ' + item.showid + '=' + item.podcastepisodename + '=' + item.timestamp} </li>
          ))}
        </ul>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App)

