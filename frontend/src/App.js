import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './top-bar/TopBar';
import Dashboard from './dashboard/Dashboard';
import Transactions from './transactions/Transactions';
import ManageTransactions from './manage-transactions/ManageTransactions';
import Settings from './settings/Settings';
import { Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { GlobalStyles } from './globalStyles';
import { ThemeProvider } from 'styled-components';

const getComponentStyle = THEME => {
  return makeStyles(reactTheme => ({
    container: {
      marginTop: '3rem',
      padding: '0px',
      height: '600px',
      backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.darkVersion})`,
      boxShadow: `35px 35px 50px 10px ${THEME.boxShadow}`,
      borderRadius: '2.5rem',
      textAlign: 'center',
      boxSizing: 'border-box',
      [reactTheme.breakpoints.down('sm')]: {
        height: '100%',
        marginTop: '2rem',
        paddingBottom: '2rem'
      }
    }
  }));
}

function App(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();

  return (
    <ThemeProvider theme={props.THEME}>
      <GlobalStyles />
      <div>
        <Container className={classes.container}>
          <Grid container justify="center" spacing={2} text-align="center">
            <Grid item xs={12}>
              <TopBar />
            </Grid>
            <Grid item xs={12}>
              <Route path="/" exact component={Dashboard} />
              <Route path="/transactions" exact component={Transactions} />
              <Route path="/add-transaction" exact component={ManageTransactions} />
              <Route path="/settings" exact component={Settings} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    THEME: state.theme
  };
};

export default connect(mapStateToProps)(App);
