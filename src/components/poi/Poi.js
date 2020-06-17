import React, {useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import filterByFields from "../filter-by-fields";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize:16,
    fontWeight: "bold"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
	root: {
	  width: '100%',
	},
	container: {
	  maxHeight: 440,
  },
  highlight: {
    height: 16,
    backgroundColor: "yellow",
  },
});

const mapStyles = {
  width: "85%",
  height: "70%",
};

const Poi = (props) => {
  const [pois, setPoi] = useState([]);
  const [selectedMaker, setSelectedMarker] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });

  useEffect(() => {
    const getPoi = async () => {
      const response = await fetch("https://ws-product.herokuapp.com/poi");
      const jsonData = await response.json();
      const sanitizedValue = jsonData.map((poi) => ({
        id: String(poi.poi_id),
        name: String(poi.name),
        lat: String(poi.lat),
        lon: String(poi.lon),
      }));
      setPoi(sanitizedValue);
    };
    getPoi();
  }, []);

  console.log(pois)

  const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const [search, setSearch] = useState("");

	const handleChangePage = (event, newPage) => {
	  setPage(newPage);
	};
  
	const handleChangeRowsPerPage = (event) => {
	  setRowsPerPage(+event.target.value);
	  setPage(0);
  };

  return (
    <section id="poiview" className="container pt-5">
      <h1 className="text-center pt-3">Poi</h1>
       <div className="col-lg-6 active-pink-4 mb-4">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          value={search}
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
			</div>
      <div className="mb-3">
      <Paper className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Latitude</StyledTableCell>
                <StyledTableCell align="right">Longitude</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {filterByFields(pois, ["id", "name", "lat", "lon"], search)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((poi, i) => (
                  <StyledTableRow key={poi.id}>
                    <StyledTableCell component="th" scope="row" className={search !== "" && poi.id.includes(search)? classes.highlight : ""}
                    >{poi.id}</StyledTableCell>
                  <StyledTableCell align="center" className={search !== "" && poi.name.includes(search)? classes.highlight : ""}>
                    {poi.name}</StyledTableCell>
                  <StyledTableCell align="center" className={search !== "" && poi.lat.includes(search)? classes.highlight : ""}>
                    {poi.lat}</StyledTableCell>
                  <StyledTableCell align="right" className={search !== "" && poi.lon.includes(search)? classes.highlight : ""}>
                    {new Intl.NumberFormat("en-ca").format(poi.lon)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filterByFields(pois, ["id", "name", "lat", "lon"], search).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 43.6532,
          lng: -79.3832,
        }}
      >
        {pois.map((item) => (
          <Marker
          onClick={(props, marker, e) =>
              setSelectedMarker({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true,
              })
            }
            position={{
              lat: +item.lat,
              lng: +item.lon,
            }}
            name={item.name}
          />
        ))}
        <InfoWindow
          marker={selectedMaker.activeMarker}
          visible={selectedMaker.showingInfoWindow}
        >
          <h6>{selectedMaker.selectedPlace.name}</h6>
        </InfoWindow>
      </Map>
    </section>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY,
})(Poi);