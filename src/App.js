import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import $ from 'jquery'
import Home from './components/pages/home'
import Nav from './components/navbar/navbar';
import Poi from './components/poi/Poi';
import DailyStats from './components/stats/DailyStats';
import HourlyStats from './components/stats/HorlyStats';
import HourlyEvents from './components/events/HourlyEvents';
import DailyEvents from './components/events/DailyEvents';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/dailyevents">
            <DailyEvents />
          </Route>
          <Route path="/hourlyevents">
            <HourlyEvents />
          </Route>
          <Route path="/dailystats">
            <DailyStats />
          </Route>
          <Route path="/hourlystats">
            <HourlyStats />
          </Route>
          <Route path="/poiview">
            <Poi />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
  componentDidMount() {

    $('#mainNav').find('a').click(function() {
      $("a").removeClass("active focus");
      $(this).toggleClass("active");
   });
   
    $('.collapse ul li a').click(function() {
      /* always close responsive nav after click */
    $('.navbar-toggler:visible').click();
  });
  }
}


export default App;
