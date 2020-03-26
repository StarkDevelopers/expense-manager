import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './top-bar/TopBar';
import Dashboard from './dashboard/Dashboard';
import ManageTransactions from './manage-transactions/ManageTransactions';
import { Route } from 'react-router-dom';
import './App.css';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '50px',
    padding: '0px',
    height: '600px',
    backgroundImage: 'linear-gradient(to right, #4d547a, #353b58)',
    boxShadow: '35px 35px 50px 10px #2e324d',
    borderRadius: '2.5rem',
    textAlign: 'center'
  },
  gridContainer: {
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container}>
        <Grid container justify="center" spacing={2} text-align="center" className={classes.gridContainer}>
          <Grid item xs={12}>
            <TopBar />
          </Grid>
          <Grid item xs={12}>
            <Route path="/" exact component={Dashboard} />
            <Route path="/add-transaction" exact component={ManageTransactions} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
