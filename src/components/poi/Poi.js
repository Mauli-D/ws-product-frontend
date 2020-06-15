import React, {useEffect, useState } from 'react';
import MapChart from "./map";
import ReactTooltip from "react-tooltip";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
});

const Poi = () => {
  const [pois, setPoi] = useState([]);

  const getPoi = async () => {
    const response = await fetch("https://ws-product.herokuapp.com/poi");
    const jsonData = await response.json();
    setPoi(jsonData);
  }
  
  useEffect(() => {
    getPoi();
  }, []);
  // console.log(pois)

  const [content, setContent] = useState("");
  const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
	const handleChangePage = (event, newPage) => {
	  setPage(newPage);
	};
  
	const handleChangeRowsPerPage = (event) => {
	  setRowsPerPage(+event.target.value);
	  setPage(0);
	};
  return (
    <section id="poiview" className="container pt-5">
      {" "}
      <h1 className="text-center pt-3">Poi</h1>
      <div className="mb-3">
        <h4 className="text-center">Chart of Poi</h4>
          <MapChart setTooltipContent={setContent} />
          <ReactTooltip>{content}</ReactTooltip>
      </div>
      <div className="col-lg-6 active-pink-4 mb-4">
				<input className="form-control" type="text" placeholder="Search" aria-label="Search" />
			</div>
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
              {pois.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((poi) => (
                <StyledTableRow key={poi.poi_id}>
                  <StyledTableCell component="th" scope="row">{poi.poi_id}</StyledTableCell>
                  <StyledTableCell align="center">{poi.name}</StyledTableCell>
                  <StyledTableCell align="center">{poi.lat}</StyledTableCell>
                  <StyledTableCell align="right">{poi.lon}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pois.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </section>
  );
};

export default Poi;