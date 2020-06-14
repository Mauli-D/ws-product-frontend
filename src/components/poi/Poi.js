import React, {useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Poi = () => {
  const [pois, setPoi] = useState([]);

  const ID = pois.map(poi => poi.poi_id);
  const name = pois.map(poi => poi.name);
  const lat = pois.map(poi => poi.lat);
  const lon = pois.map(poi => poi.lon);
  const data = {
    datasets: [{
      label: 'ID',
      type:'line',
      data: ID,
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
      label: 'lat',
      data: lat,
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    },{
      type: 'line',
      label: 'lon',
      data: lon,
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
    labels: name,
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
          labels: name,
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

  const getPoi = async () => {
    const response = await fetch("https://ws-product.herokuapp.com/poi");
    const jsonData = await response.json();
    setPoi(jsonData);
  }
  
  useEffect(() => {
    getPoi();
  }, []);

  return (
    <section id="poiview" className="container pt-5">
      {" "}
      <h1 className="text-center">Poi</h1>
      <div>
        <h4 className="text-center">Chart of Poi</h4>
        {/* <Line data={data} options={options} /> */}
      </div>
      <div className="col-lg-6 active-pink-4 mb-4">
				<input className="form-control" type="text" placeholder="Search" aria-label="Search" />
			</div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>poi_id</th>
            <th>name</th>
            <th>lat</th>
            <th>lon</th>
          </tr>
        </thead>
        {pois.map(function(poi, i) {
          return (
            <tbody key={i}>
              <tr>
                <td>{poi.poi_id}</td>
                <td>{poi.name}</td>
                <td>{poi.lat}</td>
                <td>{poi.lon}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </section>
  );
};

export default Poi;