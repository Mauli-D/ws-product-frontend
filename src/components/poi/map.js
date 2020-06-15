import React, {useEffect, useState, memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent }) => {

  const [pois, setPoi] = useState([]);

  const getPoi = async () => {
    const response = await fetch("https://ws-product.herokuapp.com/poi");
    const jsonData = await response.json();
    setPoi(jsonData);
  }
  
  useEffect(() => {
    getPoi();
  }, []);

  const lat =pois.map(poi => poi.lat);
  const lon =pois.map(poi => poi.lon);
  const name = pois.map(poi => poi.name)
  const coordinates = ([lat, lon]);
  const markers = [      
    {
      label: 'Graph for impressions/day',
      // backgroundColor: '#71B37C',
      // borderColor: '#71B37C',
      // borderWidth: 1,
      // hoverBackgroundColor: '#71B37C',
      // hoverBorderColor: '#71B37C',
      markerOffset: -30,
      name: name,
      coordinates: coordinates
      }
  ];
  // console.log(markers)
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
        <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies
            .filter(d => d.properties.REGION_UN === "Americas")
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { NAME, POP_EST } = geo.properties;
                  setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
