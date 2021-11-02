import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import customClasses from "./"

const Details = (props: any) => {
  const [apiData, setApiData] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  const ID = props.location.state.enteredValue;
  console.log(ID, "Fetched ID");
  console.log(props);

  //  const ID = 2;

  const DEMO_KEY = "T6uX0e8VDzisjIrDnyHIkA0noinKX7jTwE8oO2Ps";

  // https://api.nasa.gov/neo/rest/v1/neo/{{ENTER_ASTEROID_ID_HERE}}?api_key={{YOUR_API_KEY}}
  // 3542519
  useEffect(() => {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${ID}?api_key=${DEMO_KEY}`;
    axios
      .get(url)
      .then((response) => {
        console.log("response", response);
        setApiData(response.data);
        setError(false);
      })
      .catch(function (err) {
        setError(true);
      });
  }, []);

  // const { data } = apiData;

  // console.log("data",data);
  console.log("API DATA : ", apiData);

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
      marginTop: 12,
    },
  });

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleClick = () => {};

  
  return (
    <React.Fragment>
      <div>
        {!error ? (
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Name : {apiData.name ? apiData.name : "No Data Available"}
              </Typography>
              <Typography className={classes.title && classes.pos}>
                Nasa Reference Id :{apiData.id}
              </Typography>
              <Typography className={classes.pos}>
                Nasa Url : {apiData.nasa_jpl_url}
              </Typography>
              <Typography className={classes.title && classes.pos}>
                Is Hazardous :{" "}
                {apiData.is_potentially_hazardous_asteroid==="true"?
                  "Yes"
                  : "No"}
              </Typography>

              <Typography className={classes.title && classes.pos}>
                Is Sentry Object? :{" "}
                {apiData.is_sentry_object
                  ? apiData.is_sentry_object
                  : "No Data Available"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleClick}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Go Back
                </Link>
              </Button>
            </CardActions>
          </Card>
        ) : (
          <div className={classes.root}>
            <br />
            <br />
            <LinearProgress />
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Opps Error !!
                  <br />
                  No Data Available for ID : {ID}.
                  <br />
                  Try Valid ID.
                </Typography>
              </CardContent>
              <br />
              <br />
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Go Back
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Details;
