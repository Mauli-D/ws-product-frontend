import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Home = () => {

const [home, setHome] = useState([]);
const gethome = async () => {
    const response = await fetch("https://ws-product.herokuapp.com/");
    const data = await response.text();
    setHome(data);
  }

  useEffect(() => {
      gethome();
  }, []);
  
  return (
		<React.Fragment>

      <section className="container pt-5">
				<div className="pt-5">
					<h4 className="text-center">{home}</h4>
					<ul>
						<li className="nav-item mx-0 mx-lg-1">
							<Link to="/dailyevents">DailyEvents</Link>
						</li>
						<li className="nav-item mx-0 mx-lg-1">
							<Link to="/hourlyevents">HourlyEvents</Link>
						</li>
						<li className="nav-item mx-0 mx-lg-1">
							<Link to="/dailystats">DailyStats</Link>
						</li>
						<li className="nav-item mx-0 mx-lg-1">
							<Link to="/hourlystats">HourlyStats</Link>
						</li>
						<li className="nav-item mx-0 mx-lg-1">
							<Link to="/poiview">Poi</Link>
						</li>
					</ul>
				</div>
      </section>
			</React.Fragment>
  )
}

export default Home;