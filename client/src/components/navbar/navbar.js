import React from 'react';

/***********************
  Nav Component
 ***********************/

const Nav = props => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom text-uppercase fixed-top" id="mainNav">
      <div className="container">
        <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold rounded ml-auto collapsed" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"> <i className="fas fa-bars"></i></button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <li className="nav-item mx-0 mx-lg-1">
              <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#dailyevents">DailyEvents</a>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#hourlyevents">HourlyEvents</a>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#dailystats">DailyStats</a>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#hourlystats">HourlyStats</a>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#poi">Poi</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </React.Fragment>
  );
};


export default Nav;