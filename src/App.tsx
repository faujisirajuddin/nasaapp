import React from 'react';
import './App.css';
import Details from './components/Details';
import Home from './components/Home';
import { BrowserRouter , Route, Switch } from "react-router-dom";
function App() {
  return (
    <React.Fragment>
    <div className="App">
    <BrowserRouter>
    <Switch>
      <Route path = "/" component={Home}  exact/>
      <Route path = "/details" component={Details} />
    </Switch>
    </BrowserRouter>
    </div>
    </React.Fragment>
  );
}

export default App;
