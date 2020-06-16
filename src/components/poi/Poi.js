import React, {useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { MDBDataTable } from 'mdbreact';

const mapStyles = {
  width: '50%',
  height: '50%',
};

  const Poi = (props) => {
    const [pois, setPoi] = useState([]);
  
    const ID = pois.map(poi => poi.poi_id);
    const name = pois.map(poi => poi.name);
    const lat = pois.map(poi => poi.lat);
    const lon = pois.map(poi => poi.lon);
    const cordinates = pois.map(poi =>[ poi.lat,  poi.lon]);
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Latitude',
          field: 'lat',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Longitude',
          field: 'lon',
          sort: 'asc',
          width: 270
        }
      ],
      rows: [...pois.map((poi, i) => (
        {
          id: poi.poi_id,
          name: poi.name,
          lat: poi.lat,
          lon: poi.lon
        }
      ))]
    }

    const state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };

      const getPoi = async () => {
        const response = await fetch("https://ws-product.herokuapp.com/poi");
        const jsonData = await response.json();
        setPoi(jsonData);
      }
      
      useEffect(() => {
          getPoi();
      }, []);
    
      const onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
    
      const onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      };

      // var bounds = new props.google.maps.LatLngBounds();
      //   for (var i = 0; i < cordinates.length; i++) {
      //     bounds.extend(cordinates[i]);
      //   }
      //   console.log(bounds);

      return (
        <section id="poiview" className="container pt-5">
          {" "}
          <h1 className="text-center pt-3">Poi</h1>
          <div className="mb-3">
            <h4 className="text-center">Chart of Poi</h4>
            
          </div>
        <MDBDataTable
				striped
				bordered
				small
				data={data}
			/>
      <Map
             google={props.google}
             zoom={14}
             style={mapStyles}
              initialCenter={{
                  lat: 43.6708,
                  lng: -79.3899
              }}>
              <Marker onClick={onMarkerClick} name={'current location'} />
              <InfoWindow
                marker={state.activeMarker}
                visible={state.showingInfoWindow}
                onClose={onClose}
              >
                <div>
                  {/* <h4>{this.state.selectedPlace.name}</h4> */}
                </div>
              </InfoWindow>
            </Map>
      </section>
      );
    } 

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(Poi);