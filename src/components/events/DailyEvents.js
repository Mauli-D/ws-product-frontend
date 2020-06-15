import React, {useEffect, useState } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FuzzyHighlighter, { Highlighter } from 'react-fuzzy-highlighter';

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

const DailyEvents = () => {
	const [dailyEvents, setDailyevents] = useState([]);

	const events = dailyEvents.map(daily => daily.events);
	const date = dailyEvents.map(daily => daily.date);
	const data ={
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

	const getDailyevents = async () => {
		const response = await fetch("https://ws-product.herokuapp.com/events/daily");
		const jsonData = await response.json();
		setDailyevents(jsonData);
	}

	useEffect(() => {
		getDailyevents();
	}, []);

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
		<section id="dailyevents" className="container pt-5">
			{" "}
			<h1 className="text-center">DailyEvents</h1>
			<div className="mb-3">
				<h4 className="text-center">Chart of Daily Events</h4>
				<Line data={data} />
				<Bar data={data} />
			</div>
			<div className="col-lg-6 active-pink-4 mb-4">
				<input className="form-control" type="text" placeholder="Search" aria-label="Search" />
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
							{dailyEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dailyEvent) => (
								<StyledTableRow key={dailyEvent.date}>
									<StyledTableCell component="th" scope="row">{dailyEvent.date}</StyledTableCell>
									<StyledTableCell align="right">{dailyEvent.events}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				{/* <TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={dailyEvents.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/> */}
			</Paper>
		</section>
	);
};

export default DailyEvents;