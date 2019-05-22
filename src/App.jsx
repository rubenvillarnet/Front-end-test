import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import Albums from './components/Albums';
import Photos from './components/Photos';
import Header from './components/Header';



function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/" component={Albums}/>
        <Route exact path="/album/:id" component={Photos}/>
      </Switch>
    </div>
  );
}

export default App;
