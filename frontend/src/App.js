import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './style.css'
import HomeScreen from './screens/HomeScreen'
import CreatePOPUP from './screens/CreatePOPUP';
import EditPOPUP from './screens/EditPOPUP';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/add' component={CreatePOPUP} />
        <Route path='/edit/:id' component={EditPOPUP} />
      </Switch>
    </div>
  );
}

export default App;
