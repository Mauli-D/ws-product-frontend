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

const HourlyEvents = () => {
  const [hourlyEvents, setHourlyevents] = useState([]);

  const events = hourlyEvents.map((hourlyEvent) => hourlyEvent.events);
  const date = hourlyEvents.map((hourlyEvent) => hourlyEvent.date);
  const hour = hourlyEvents.map((hourlyEvent) => hourlyEvent.hour);

  const eventchart = {
    labels: date,
    datasets: [
      {
        label: "Graph for Hourly Events",
        backgroundColor: "#71B37C",
        borderColor: "#71B37C",
        borderWidth: 1,
        hoverBackgroundColor: "#71B37C",
        hoverBorderColor: "#71B37C",
        data: events,
      },
    ],
  };
  const data = {
    datasets: [
      {
        label: "hours",
        type: "line",
        data: hour,
        fill: false,
        borderColor: "#EC932F",
        backgroundColor: "#EC932F",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        yAxisID: "y-axis-2",
      },
      {
        type: "line",
        label: "events",
        data: events,
        fill: false,
        backgroundColor: "#71B37C",
        borderColor: "#71B37C",
        hoverBackgroundColor: "#71B37C",
        hoverBorderColor: "#71B37C",
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    responsive: true,
    labels: date,
    tooltips: {
      mode: "label",
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          labels: date
        },
      ],
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const getHourlyevents = async () => {
      const response = await fetch(
        "https://ws-product.herokuapp.com/events/hourly"
      );
      const jsonData = await response.json();
      const sanitizedValue = jsonData.map((hourlyEvent) => ({
        events: String(hourlyEvent.events),
        hour: String(hourlyEvent.hour),
        date: moment(hourlyEvent.date).format("DD-MM-YYYY"),
      }));
      setHourlyevents(sanitizedValue);
    };
    getHourlyevents();
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
    <section id="hourlyevents" className="container pt-5">
      {" "}
      <h1 className="text-center pt-3">HourlyEvents</h1>
      <div className="mb-3">
        <h4 className="text-center">Chart of Hourly Events</h4>
        <Line data={data} options={options} />
        <hr />
        <Bar data={eventchart} />
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
                <StyledTableCell align="center">Hours</StyledTableCell>
                <StyledTableCell align="right">Events</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterByFields(hourlyEvents, ["date", "hour", "events"], search)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((hourlyEvent, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th"
                      scope="row"
                      className={search !== "" && hourlyEvent.date.includes(search) ? classes.highlight : ""}
                    >{hourlyEvent.date}</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={search !== "" && hourlyEvent.hour.includes(search) ? classes.highlight : ""}
                    >{hourlyEvent.hour}</StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={search !== "" && hourlyEvent.events.includes(search) ? classes.highlight : ""}
                    >{hourlyEvent.events}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filterByFields(hourlyEvents, ["date", "hour", "events"], search).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
};

export default HourlyEvents