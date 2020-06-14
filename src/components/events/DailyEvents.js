import React, {useEffect, useState } from 'react';
import {Bar, Line} from 'react-chartjs-2';

const DailyEvents = () => {
	const [dailyEvents, setDailyevents] = useState([]);

	const events = dailyEvents.map(daily => daily.events);
	const date = dailyEvents.map(daily => daily.date);
	const data ={
		labels: date,
		datasets: [
			{
			label: 'Graph for Daily Events',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: events
			}
		]
	};

	const getDailyevents = async () => {
		const response = await fetch("https://ws-product.herokuapp.com/events/daily");
		const jsonData = await response.json();
		setDailyevents(jsonData);
	}

	useEffect(() => {
		getDailyevents();
	}, []);

  return (
		<section id="dailyevents" className="container pt-5">
			{" "}
			<h1 className="text-center">DailyEvents</h1>
			<div className="col-lg-6 active-pink-4 mb-4">
				<input className="form-control" type="text" placeholder="Search" aria-label="Search" />
			</div>
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th>Date</th>
						<th>Events</th>
					</tr>
				</thead>
				{dailyEvents.map(function(dailyEvent, i) {
					return (
						<tbody key={i}>
							<tr>
								<td>{dailyEvent.date}</td>
								<td>{dailyEvent.events}</td>
							</tr>
						</tbody>
					)
				})}
			</table>
			<div>
				<h4 className="text-center">Chart of Daily Events</h4>
				<Line data={data} />
				<Bar data={data} />
			</div>
		</section>
	);
};

export default DailyEvents;