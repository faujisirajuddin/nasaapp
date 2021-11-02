import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import Button from '@material-ui/core/Button';

const Home = (props: any) => {
  const [enteredValue, setEnteredValue] = useState<String>("");
  const [click, setClick] = useState<boolean>(false);
  const [selected, setSelected] = React.useState<any[]>([
    {
      name: "",
    },
  ]);
  const [option, setOption] = useState<any>(0);
  const [show, setShow] = useState<boolean>(false);

  const key = "T6uX0e8VDzisjIrDnyHIkA0noinKX7jTwE8oO2Ps";
  const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setSelected(response.data.near_earth_objects);
      console.log("API Value", selected);
    });

  }, [click]);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
          width: "50ch",
        },
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
      },
      title: {
        fontSize: 14,
        textAlign: "center"
      },
      pos: {
        marginBottom: 12,
      },
    })
  );
  const handleChange = (event: any) => {
    setEnteredValue(event?.target.value);
  };
  const handleSubmit = () => {
    props.history.push("/details", {
      enteredValue,
    });
  };

  const selectHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
    setShow(true);
    console.log(option, "option");
  };

  const randomHandleSubmit = () => {
    setClick(true);
  };

  console.log("option", option);
  const classes = useStyles();
  return (
    <React.Fragment>
      {!show ? (
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          style={{ marginTop: "140px" }}
        >
          <TextField
            id="filled-basic"
            label="Enter Asteroid"
            variant="filled"
            value={enteredValue}
            onChange={handleChange}
            helperText="Example - 2000719"
          />

          <br />
          {enteredValue.length > 0 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled
            >
              Submit
            </Button>
          )}
          <br />

          <Button
            variant="contained"
            color="primary"
            onClick={randomHandleSubmit}
          >
            Random Id
          </Button>

          <br />
          {click ? (
            <TextField
              id="standard-select-currency"
              select
              label="Select Randomly"
              value={option}
              onChange={selectHandleChange}
              helperText="Select Nasa Id Randomly"
            >
              <MenuItem>Select Random Id</MenuItem>
              {selected.map((option, index) => (
                <MenuItem key={option.id} value={index}>
                  {option.id}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            ""
          )}
        </form>
      )
        :
        (

          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
              >
                Name : {selected[option].name ? selected[option].name_limited : "Data Not Available"}
              </Typography>
              <Typography
                className={classes.title}
              >
                ID : {selected[option].id ? selected[option].id : "Data Not Available"}
              </Typography>

              <Typography
                className={classes.title}
              >
                Is Hazardous : {selected[option].is_potentially_hazardous_asteroid === "True" ? "Yes" : "No"}
              </Typography>

              <Typography
                className={classes.title}
              >
                Is Sentry Object : {selected[option].is_sentry_object === "True" ? "Yes" : "No"}
              </Typography>


              <Typography variant="body2" component="p">
                Nasa Url : {selected[option].nasa_jpl_url}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">
                <Link to="/" style={{ color: 'white', textDecoration: "none" }}>
                  Go Back
                </Link>
              </Button>
            </CardActions>
          </Card>
        )
      }
    </React.Fragment>
  );
};

export default withRouter(Home);
