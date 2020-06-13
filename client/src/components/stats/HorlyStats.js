import React, {useEffect, useState } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


const HourlyStats = () => {
  const [hourlyStats, setHourlystats] = useState([]);

  const date = hourlyStats.map(hourly => hourly.date);
  const hours = hourlyStats.map(hourly => hourly.hour);
  const impressions = hourlyStats.map(hourly => hourly.impressions);
  const clicks = hourlyStats.map(hourly => hourly.clicks);
  const revenue = hourlyStats.map(hourly => hourly.revenue);
  const data = {
    datasets: [{
      label: 'Revenue',
      type:'line',
      data: revenue,
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-1'
    },{
      label: 'Impressions',
      type: 'line',
      data: impressions,
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-2'
    },{
      label: 'Clicks',
      type: 'line',
      data: clicks,
      fill: false,
      backgroundColor: '#FF0000',
      borderColor: '#FF0000',
      hoverBackgroundColor: '#FF0000',
      hoverBorderColor: '#FF0000',
      yAxisID: 'y-axis-3'
    },{
      label: 'Hours',
      type: 'line',
      data: hours,
      fill: false,
      backgroundColor: '#0000FF',
      borderColor: '#0000FF',
      hoverBackgroundColor: '#0000FF',
      hoverBorderColor: '#0000FF',
      yAxisID: 'y-axis-4'
    },
  ]};
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
        },
        {
          type: 'linear',
          display: true,
          position: 'top',
          id: 'y-axis-3',
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
          position: 'bottom',
          id: 'y-axis-4',
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

  const getHourlystats = async () => {
    const response = await fetch("http://localhost:5555/stats/hourly");
    const jsonData = await response.json();
    setHourlystats(jsonData);
  }

  useEffect(() => {
      getHourlystats();
  }, []);

  return (
    <section id="hourlystats" className="container pt-5">
      {" "}
      <h1>HourlyStats</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Revenue</th>
          </tr>
        </thead>
        {hourlyStats.map(function(hourly, i) {
          return (
            <tbody key={i}>
              <tr>
                <td>{hourly.date}</td>
                <td>{hourly.hour}</td>
                <td>{hourly.impressions}</td>
                <td>{hourly.clicks}</td>
                <td>{hourly.revenue}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <div>
        <h4 className="text-center">Chart of Hourly Stats</h4>
        <Line data={data} options={options} />
      </div>
    </section>
  );
};

export default HourlyStats;