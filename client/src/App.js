import React, {Fragment} from 'react';
import './App.css';

import Nav from './components/navbar/navbar';
import Poi from './components/poi/Poi';
import DailyStats from './components/stats/DailyStats';
import HourlyStats from './components/stats/HorlyStats';
import HourlyEvents from './components/events/HourlyEvents';
import DailyEvents from './components/events/DailyEvents';
function App() {
  return (
    <Fragment>
      <Nav />
      <DailyEvents />
      <HourlyEvents />
      <DailyStats />
      <HourlyStats />
      <Poi />
    </Fragment>
  );
}


export default App;
