import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, AccountBalanceWallet, SyncAlt, Settings } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const getComponentStyle = THEME => {
  return makeStyles(theme => ({
    root: {
    },
    gridContainer: {
      borderBottom: `10px inset ${THEME.darkVersion}`
    },
    iconsContainer: {
      borderRadius: '1rem',
      backgroundImage: `linear-gradient(to bottom right, ${THEME.lightVersion}, ${THEME.darkVersion}, ${THEME.lightVersion})`,
      boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
      margin: '16px',
      marginBottom: '24px'
    },
    icons: {
      backgroundImage: `linear-gradient(to bottom right, ${THEME.darkVersion}, ${THEME.lightVersion})`,
      color: THEME.fontColor,
      padding: '10px 15px',
      borderRadius: '1rem'
    },
    activeLink: {
      '& div': {
        boxShadow: 'none',
      }
    }
  }));
}

function TopBar(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="stretch" className={classes.gridContainer}>
        <Grid item>
          <NavLink to="/" exact activeClassName={classes.activeLink}>
            <div className={classes.iconsContainer}>
              <Dashboard className={classes.icons} />
            </div>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/transactions" exact activeClassName={classes.activeLink}>
            <div className={classes.iconsContainer}>
              <AccountBalanceWallet className={classes.icons} />
            </div>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/add-transaction" exact activeClassName={classes.activeLink}>
            <div className={classes.iconsContainer}>
              <SyncAlt className={classes.icons} />
            </div>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/settings" exact activeClassName={classes.activeLink}>
            <div className={classes.iconsContainer}>
              <Settings className={classes.icons} />
            </div>
          </NavLink>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    THEME: state.theme
  };
};

export default connect(mapStateToProps)(TopBar);
