import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import axios from "axios";

import { useTheme } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import TrainerView from "./TrainerView";
import Payment from "../../Payment/Payment";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Custom Fitness
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  cardMedia: {
    paddingTop: "56.25%",
    width: "35%",
    height: "35%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function StudentsItem(props) {
  console.log("props in trainers item", props);
  const [trainers, setTrainers] = useState(props.allTrainers);
  const classes = useStyles();
  // const [state,setState]=useState()

  const handleButton = evt => {
    evt.preventDefault();

    const getTrainersArr = props.allTrainers.filter(
      item => item.expertise === props.studentData.focus
    );

    setTrainers(getTrainersArr);
  };

  const handleBack = evt => {
    evt.preventDefault();
    setTrainers(props.allTrainers);
  };

  const handleSubscribe = (evt, id) => {
    evt.preventDefault();

    // axios
    //   .post(`http://localhost:8080/subscriptions/subscribe`, {
    //     trainer_id: id,
    //     student_id: props.studentData.id,
    //     student_name: props.studentData.name
    //   })
    //   .then(res => {
    //     alert("Thank you for your Subscription ");
    //   });
  };

  const theme = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />

      <main
        style={{
          width: "100%"
        }}
      >
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Trainers
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Below is a list of all of our Trainers, click on each Trainer to
              see their information
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={handleButton}
                    variant="contained"
                    color="primary"
                  >
                    Find your Custom Fit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    color="primary"
                  >
                    Random Fit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {trainers.map(card => (
              <Grid item key={card.id} xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.avatar}
                    title={card.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography
                      style={{
                        fontWeight: "700",
                        fontSize: "1.2rem"
                      }}
                    >
                      {card.name}
                    </Typography>
                    <Typography>{card.about}</Typography>
                  </CardContent>
                  <CardActions>
                    <TrainerView
                      allTrainers={props.allTrainers}
                      trainerId={card.id}
                    />
                    <Button onClick={evt => handleSubscribe(evt, card.id)}>
                    <Payment studentData={props.studentData} />
                    
                    </Button>{" "}
                    {/* <Button
                      onClick={evt => handleSubscribe(evt, card.id)}
                      size="small"
                      color="primary"
                    ><Route path="students/trainers/payment">
                    <Payment studentData={props.studentData} />
                    <Redirect to="students/trainers/payment" />
            </Route>
                      Subscribe
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
