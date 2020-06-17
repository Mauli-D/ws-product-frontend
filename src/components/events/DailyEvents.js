import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import filterByFields from "../filter-by-fields";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  highlight: {
    height: 16,
    backgroundColor: "yellow",
  },
});

const DailyEvents = () => {
	const [dailyEvents, setDailyevents] = useState([]);
	const events = dailyEvents.map(dailyEvent => dailyEvent.events);
	const date = dailyEvents.map(dailyEvent => moment(dailyEvent.date).format('DD-MM-YYYY'));	
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

	useEffect(() => {
    const getDailyevents = async () => {
      const response = await fetch("https://ws-product.herokuapp.com/events/daily");
      const jsonData = await response.json();
      const sanitizedValue = jsonData.map((dailyEvent) => ({
          events: String(dailyEvent.events),
          date: moment(dailyEvent.date).format("DD-MM-YYYY"),
      }));
      setDailyevents(sanitizedValue);
    }
		getDailyevents();
	}, []);

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
		<section id="dailyevents" className="container pt-5">
			{" "}
			<h1 className="text-center pt-3">DailyEvents</h1>
			<div className="mb-3">
				<h4 className="text-center">Chart of Daily Events</h4>
				<Line data={dailychart} />
        <hr/>
				<Bar data={dailychart} />
        <hr/>
			</div>
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
      <Paper className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="right">Events</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterByFields(dailyEvents, ["date", "events"], search)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dailyEvent, i) => (
                  <StyledTableRow key={dailyEvent.date}>
                    <StyledTableCell component="th" scope="row" className={ search !== "" && dailyEvent.date.includes(search) ? classes.highlight : "" }>
                      {dailyEvent.date}</StyledTableCell>
                    <StyledTableCell align="right" className={ search !== "" && dailyEvent.events.includes(search) ? classes.highlight : "" }>
                      {dailyEvent.events}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filterByFields(dailyEvents, ["date", "events"], search).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
		</section>
	);
};

export default DailyEvents;