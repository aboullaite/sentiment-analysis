import React from 'react';
import logo from './logo.svg';
import './App.css';
import TweetList from './components/TweetList';
import Navigation from './components/Navigation';
const App: React.FC = () => {
  return (
    <div className="container">
        <Navigation/>
        <TweetList/>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
    </div>
  );
}
export default App;
