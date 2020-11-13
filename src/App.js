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
    const [guidNames, setGuidNames] = React.useState([]);


    const myInit = {
      body: {
          id: guidName,
          showname : showName,
          creativeUrl: creativeUrlName
          
      }, // replace this with attributes you have in your DB
  };


  useEffect(() => {
    API.get("podcastAPI", "/creativeurl").then((creative) => console.log(creative));
    },[]);

    useEffect(() => {
      API.get("podcastAPI", "/creativeurl").then((creative) => {
          setGuidNames([...guidNames, ...creative]);
      });
      },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("podcastAPI", "/creativeurl", myInit).then(()=>{
      setGuidNames([...guidNames, {creativeurl:creativeUrlName,id:guidName,showname:showName}])
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
        <input value = {guidName} placeholder = 'Power Level' onChange={(e) => setGuidName(e.target.value)}/>
        <button>add character</button>
        </form>
        <ul>
        {guidNames.map((item,key) => (
          <li key={key}>{item.id + ' = '} {item.showname}</li>
          ))}
        </ul>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App)

