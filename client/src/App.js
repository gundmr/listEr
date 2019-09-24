import React from 'react';
import AppNavbar from './components/AppNavbar';
import List from './components/List';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <AppNavbar />
      <List />
    </div>
  );
}

export default App;
