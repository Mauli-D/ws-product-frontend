import React, {useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment'
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
});

const HourlyEvents = () => {
  const [hourlyEvents, setHourlyevents] = useState([]);

  const events = hourlyEvents.map(hourlyEvent => hourlyEvent.events);
  const date = hourlyEvents.map(hourlyEvent => moment(hourlyEvent.date).format('DD-MM-YYYY'));
  // console.log(date);
  const hour = hourlyEvents.map(hourlyEvent => hourlyEvent.hour);

  const hourchart ={
    labels: date,
    datasets: [
      {
      label: 'Graph for Hourly Events',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: hour
      }
    ]
  };

  const eventchart ={
    labels: date,
    datasets: [
      {
      label: 'Graph for Hourly Events',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: events
      }
    ]
  };
  const data = {
    datasets: [{
      label: 'hours',
      type:'line',
      data: hour,
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
      label: 'events',
      data: events,
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    }]
  };
  
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
        }
      ]
    }
  };

  const getHourlyevents = async () => {
    const response = await fetch("https://ws-product.herokuapp.com/events/hourly");
    const jsonData = await response.json();
    setHourlyevents(jsonData);
  }

  useEffect(() => {
    getHourlyevents();
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
    <section id="hourlyevents"className="container pt-5">
      {" "}
      <h1 className="text-center pt-3">HourlyEvents</h1>
      <div className="mb-3">
          <h4 className="text-center">Chart of Hourly Events</h4>
          <Line data={data} options={options} />
          <Bar data={hourchart} />
          <Bar data={eventchart} />
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
                <StyledTableCell align="center">Hours</StyledTableCell>
                <StyledTableCell align="right">Events</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hourlyEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hourlyEvent, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">{moment(hourlyEvent.date).format('DD-MM-YYYY')}</StyledTableCell>
                  <StyledTableCell align="center">{hourlyEvent.hour}</StyledTableCell>
                  <StyledTableCell align="right">{hourlyEvent.events}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={hourlyEvents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
};

export default HourlyEvents;