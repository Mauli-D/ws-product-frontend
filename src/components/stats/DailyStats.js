import React, {useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


const DailyStats = () => {
  const [dailyStats, setDailystats] = useState([]);

  const date = dailyStats.map(daily => daily.date);
  const impressions = dailyStats.map(daily => daily.impressions);
  const clicks = dailyStats.map(daily => daily.clicks);
  const revenue = dailyStats.map(daily => daily.revenue);
  const data = {
    datasets: [{
      label: 'Revenue',
      type:'bar',
      data: revenue,
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    },{
      label: 'Impressions',
      type: 'bar',
      data: impressions,
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    },{
      label: 'Clicks',
      type: 'bar',
      data: clicks,
      fill: false,
      backgroundColor: '#FF0000',
      borderColor: '#FF0000',
      hoverBackgroundColor: '#FF0000',
      hoverBorderColor: '#FF0000',
      yAxisID: 'y-axis-3'
    }
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
        }
      ]
    }
  };

  const getDailystats = async () => {
    const response = await fetch("https://ws-product.herokuapp.com/stats/daily");
    const jsonData = await response.json();
    setDailystats(jsonData);
  }
  
  useEffect(() => {
      getDailystats();
  }, []);

  return (
    <section id="dailystats" className="container pt-5">
      {" "}
      <h1 className="text-center">DailyStats</h1>
      <div className="col-lg-6 active-pink-4 mb-4">
				<input className="form-control" type="text" placeholder="Search" aria-label="Search" />
			</div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Revenue</th>
          </tr>
        </thead>
        {dailyStats.map(function(daily, i) {
          return (
            <tbody key={i}>
              <tr>
                <td>{daily.date}</td>
                <td>{daily.impressions}</td>
                <td>{daily.clicks}</td>
                <td>{daily.revenue}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <div>
        <h4 className="text-center">Chart of Daily Stats</h4>
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default DailyStats;