import React, {useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';


const HourlyEvents = () => {
  const [hourlyEvents, setHourlyevents] = useState([]);

  const events = hourlyEvents.map(hourlyEvent => hourlyEvent.events);
  const date = hourlyEvents.map(hourlyEvent => hourlyEvent.date);
  const hour = hourlyEvents.map(hourlyEvent => hourlyEvent.hour);
  const data = {
    datasets: [{
      label: 'hours',
      type:'line',
      data: hour,
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    },{
      type: 'line',
      label: 'events',
      data: events,
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    }]
  };
  
  const options = {
    responsive: true,
    labels: date,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: date,
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  };

  const getHourlyevents = async () => {
    const response = await fetch("http://localhost:5555/events/hourly");
    const jsonData = await response.json();
    setHourlyevents(jsonData);
  }

  useEffect(() => {
    getHourlyevents();
  }, []);

  return (
    <section id="hourlyevents"className="container pt-5">
      {" "}
      <h1>HourlyEvents</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Events</th>
          </tr>
        </thead>
        {hourlyEvents.map(function(hourlyEvent, i) {
          return (
            <tbody key={i}>
              <tr>
                <td>{hourlyEvent.date}</td>
                <td>{hourlyEvent.hour}</td>
                <td>{hourlyEvent.events}</td>
              </tr>
            </tbody>
          )
        })}
        </table>
        <div>
          <h4 className="text-center">Chart of Hourly Events</h4>
          <Line data={data} options={options} />
        </div>
    </section>
  );
};

export default HourlyEvents;