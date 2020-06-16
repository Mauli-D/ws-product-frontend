import React, {useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';
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

const HourlyStats = () => {
  const [hourlyStats, setHourlystats] = useState([]);

  const date = hourlyStats.map(hourly => moment(hourly.date).format('DD-MM-YYYY'));
  const hours = hourlyStats.map(hourly => hourly.hour);
  const impressions = hourlyStats.map(hourly => hourly.impressions);
  const clicks = hourlyStats.map(hourly => hourly.clicks);
  const revenue = hourlyStats.map(hourly => hourly.revenue);
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
  // const revenuechart ={
  //   labels: date,
  //   datasets: [
  //     {
  //     label: 'Graph for revenue/day',
  //     backgroundColor: '#EC932F',
  //     borderColor: '#EC932F',
  //     borderWidth: 1,
  //     hoverBackgroundColor: '#EC932F',
  //     hoverBorderColor: '#EC932F',
  //     data: revenue
  //     }
  //   ]
  // };

  const data = {
    datasets: [{
      label: 'Revenue',
      type:'line',
      data: revenue,
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-1'
    },{
      label: 'Impressions',
      type: 'line',
      data: impressions,
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-2'
    },{
      label: 'Clicks',
      type: 'line',
      data: clicks,
      fill: false,
      backgroundColor: '#FF0000',
      borderColor: '#FF0000',
      hoverBackgroundColor: '#FF0000',
      hoverBorderColor: '#FF0000',
      yAxisID: 'y-axis-3'
    },{
      label: 'Hours',
      type: 'line',
      data: hours,
      fill: false,
      backgroundColor: '#0000FF',
      borderColor: '#0000FF',
      hoverBackgroundColor: '#0000FF',
      hoverBorderColor: '#0000FF',
      yAxisID: 'y-axis-4'
    },
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
        },
        {
          type: 'linear',
          display: true,
          position: 'bottom',
          id: 'y-axis-4',
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

  const getHourlystats = async () => {
    const response = await fetch("https://ws-product.herokuapp.com/stats/hourly");
    const jsonData = await response.json();
    setHourlystats(jsonData);
  }

  useEffect(() => {
      getHourlystats();
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
    <section id="hourlystats" className="container pt-5">
      {" "}
      <h1 className="text-center pt-3">HourlyStats</h1>
      <div className="mb-3">
        <h4 className="text-center">Chart of Hourly Stats</h4>
        <Line data={data} options={options} />
        <Bar data={revenuechart} />
        <Bar data={impressionchart} />
        <Bar data={clickchart} />
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
                <StyledTableCell align="center">Impressions</StyledTableCell>
                <StyledTableCell align="center">Clicks</StyledTableCell>
                <StyledTableCell align="right">Revenue</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hourlyStats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hourly, i) => (
                <StyledTableRow key ={i}>
                  <StyledTableCell component="th" scope="row">{moment(hourly.date).format('DD-MM-YYYY')}</StyledTableCell>
                  <StyledTableCell align="center">{hourly.hour}</StyledTableCell>
                  <StyledTableCell align="center">{hourly.impressions}</StyledTableCell>
                  <StyledTableCell align="center">{hourly.clicks}</StyledTableCell>
                  <StyledTableCell align="right">{new Intl.NumberFormat("en-ca").format(hourly.revenue)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={hourlyStats.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
};

export default HourlyStats;