import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, AccountBalanceWallet, SyncAlt } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
  },
  gridContainer: {
    borderBottom: '10px inset #3d4363'
  },
  iconsContainer: {
    borderRadius: '1rem',
    backgroundImage: 'linear-gradient(to bottom right, #535a7e, #3d4363, #535a7e)',
    boxShadow: '3px 3px 5px 1px #2e324d',
    margin: '16px',
    marginBottom: '24px'
  },
  icons: {
    backgroundImage: 'linear-gradient(to bottom right, #3d4363, #4d547a)',
    color: '#a8aed2',
    padding: '10px 15px',
    borderRadius: '1rem'
  }
}));

function TopBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="stretch" className={classes.gridContainer}>
        <Grid item>
          <Link to="/">
            <div className={classes.iconsContainer}>
              <Dashboard className={classes.icons} />
            </div>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/transactions">
            <div className={classes.iconsContainer}>
              <AccountBalanceWallet className={classes.icons} />
            </div>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/add-transaction">
            <div className={classes.iconsContainer}>
              <SyncAlt className={classes.icons} />
            </div>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default TopBar;
