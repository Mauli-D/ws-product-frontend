import React, {useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment'
import { MDBDataTable } from 'mdbreact';

const DailyStats = () => {
  const [dailyStats, setDailystats] = useState([]);

  const date = dailyStats.map(daily => moment(daily.date).format('DD-MM-YYYY'));
  const impressions = dailyStats.map(daily => daily.impressions);
  const clicks = dailyStats.map(daily => daily.clicks);
  const revenue = dailyStats.map(daily => daily.revenue);

  const data = {
		columns: [
      {
				label: 'Date',
				field: 'date',
				sort: 'asc',
				width: 150
			},
      {
				label: 'Impressions',
				field: 'impressions',
				sort: 'asc',
				width: 270
      },
      {
				label: 'Clicks',
				field: 'clicks',
				sort: 'asc',
				width: 150
      },
      {
				label: 'Revenue',
				field: 'revenue',
				sort: 'asc',
				width: 150
			},
		],
		rows: [...dailyStats.map((daily, i) => (
			{
				date: <p key={i}>{moment(daily.date).format('DD-MM-YYYY')}</p>,
        revenue: <p>{new Intl.NumberFormat("en-ca").format(daily.revenue)}</p>,
        impressions: <p>{daily.impressions}</p>,
        clicks: <p>{daily.clicks}</p>
			}
		))]
	}
  const impressionchart ={
    labels: date,
    datasets: [
      {
      label: 'Graph for impressions/day',
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      borderWidth: 1,
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      data: impressions
      }
    ]
  };
  const revenuechart ={
    labels: date,
    datasets: [
      {
      label: 'Graph for revenue/day',
      backgroundColor: '#EC932F',
      borderColor: '#EC932F',
      borderWidth: 1,
      hoverBackgroundColor: '#EC932F',
      hoverBorderColor: '#EC932F',
      data: revenue
      }
    ]
  };
  const clickchart ={
    labels: date,
    datasets: [
      {
      label: 'Graph for clicks/day',
      backgroundColor: '#FF0000',
      borderColor: '#FF0000',
      borderWidth: 1,
      hoverBackgroundColor: '#FF0000',
      hoverBorderColor: '#FF0000',
      data: clicks
      }
    ]
  };
  
  const statschart = {
    datasets: [{
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
      <h1 className="text-center pt-3">DailyStats</h1>
      <div className="mb-3">
        <h4 className="text-center">Chart of Daily Stats</h4>
        <Bar data={statschart} options={options} />
        <Bar data={impressionchart} />
        <Bar data={revenuechart} />
        <Bar data={clickchart} />
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

export default DailyStats;