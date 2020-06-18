import React, {Fragment} from 'react';
import { Link } from "react-router-dom";

/***********************
  Nav Component
 ***********************/

const Nav = props => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom text-uppercase fixed-top" id="mainNav">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold rounded ml-auto collapsed" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"> <i className="fas fa-bars"></i></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <li className="nav-item mx-0 mx-lg-1">
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/">home</Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/dailyevents">DailyEvents</Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/hourlyevents">HourlyEvents</Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/dailystats">DailyStats</Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/hourlystats">HourlyStats</Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/poiview">Poi</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};


export default Nav;