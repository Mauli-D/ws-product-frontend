import React, {useEffect, useState } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import moment from 'moment'
import { MDBDataTable, MDBContainer } from 'mdbreact';
// import FuzzyHighlighter, { Highlighter } from 'react-fuzzy-highlighter';

const DailyEvents = () => {
	const [dailyEvents, setDailyevents] = useState([]);
	const events = dailyEvents.map(dailyEvent => dailyEvent.events);
	const date = dailyEvents.map(dailyEvent => moment(dailyEvent.date).format('DD-MM-YYYY'));	
	
	const data = {
		columns: [
			{
				label: 'Date',
				field: 'date',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Events',
				field: 'events',
				sort: 'asc',
				width: 270
			},
		],
		rows: [...dailyEvents.map((dailyEvent, i) => (
			{
				date: <MDBContainer>{moment(dailyEvent.date).format('DD-MM-YYYY')}</MDBContainer>,
				events: <MDBContainer>{dailyEvent.events}</MDBContainer>,
			}
		))]
	}
	const dailychart ={
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
			<h1 className="text-center pt-3">DailyEvents</h1>
			<div className="mb-3">
				<h4 className="text-center">Chart of Daily Events</h4>
				<Line data={dailychart} />
				<Bar data={dailychart} />
			</div>
			<MDBDataTable
				striped
				bordered
				small
				data={data}
			/>
		</section>
	);
};

export default DailyEvents;