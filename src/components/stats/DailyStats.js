import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
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

import filterByFields from "../filter-by-fields";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
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

const DailyStats = () => {
  const [dailyStats, setDailystats] = useState([]);

  const date = dailyStats.map(daily => daily.date);
  const impressions = dailyStats.map(daily => daily.impressions);
  const clicks = dailyStats.map(daily => daily.clicks);
  const revenue = dailyStats.map(daily => daily.revenue);
  const impressionchart = {
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
  const revenuechart = {
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
  const clickchart = {
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
    }, {
      label: 'Revenue',
      type: 'bar',
      data: revenue,
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    }, {
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
    ]
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

  useEffect(() => {
    const getDailystats = async () => {
      const response = await fetch("https://ws-product.herokuapp.com/stats/daily");
      const jsonData = await response.json();
      const sanitizedValue = jsonData.map((daily) => ({
        revenue: String(daily.revenue),
        impressions: String(daily.impressions),
        clicks: String(daily.clicks),
        date: moment(daily.date).format("DD-MM-YYYY"),
      }));
      setDailystats(sanitizedValue);
    }
    getDailystats();
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
    <section id="dailystats" className="container pt-5">
      {" "}
      <h1 className="text-center pt-3">DailyStats</h1>
      <div className="mb-3">
        <h4 className="text-center">Chart of Daily Stats</h4>
        <Bar data={statschart} options={options} />
        <hr />
        <Bar data={impressionchart} />
        <hr />
        <Bar data={revenuechart} />
        <hr />
        <Bar data={clickchart} />
        <hr />
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
                <StyledTableCell align="center">Impressions</StyledTableCell>
                <StyledTableCell align="center">Clicks</StyledTableCell>
                <StyledTableCell align="right">Revenue</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterByFields(dailyStats, ["date", "impressions", "clicks", "revenue"], search)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((daily, i) => (
                  <StyledTableRow key={daily.date}>
                    <StyledTableCell component="th" scope="row" className={search !== "" && daily.date.includes(search) ? classes.highlight : ""}
                    >{daily.date}</StyledTableCell>
                    <StyledTableCell align="center" className={search !== "" && daily.impressions.includes(search) ? classes.highlight : ""}>
                      {daily.impressions}</StyledTableCell>
                    <StyledTableCell align="center" className={search !== "" && daily.clicks.includes(search) ? classes.highlight : ""}>
                      {daily.clicks}</StyledTableCell>
                    <StyledTableCell align="right" className={search !== "" && daily.revenue.includes(search) ? classes.highlight : ""}>
                      {new Intl.NumberFormat("en-ca").format(daily.revenue)}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filterByFields(dailyStats, ["date", "impressions", "clicks", "revenue"], search).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
};

export default DailyStats;