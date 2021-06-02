import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header/Header'
import Home from './Views/Home/Home'
import Register from './Views/Register/Register'
import Login from './Views/Login/Login'
import Charts from './Views/Charts/Charts'
import './App.css';

function App() {
  return(
    <Router>
      <Header />
      <Switch>
        <Route path='/charts'>
          <Charts />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
