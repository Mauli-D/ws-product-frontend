import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

import Nav from './components/navbar/navbar';
import Poi from './components/poi/Poi';
import DailyStats from './components/stats/DailyStats';
import HourlyStats from './components/stats/HorlyStats';
import HourlyEvents from './components/events/HourlyEvents';
import DailyEvents from './components/events/DailyEvents';

export default function App() {
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
      </Switch>
    </Router>
  );
}


// export default App;
