import React from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const getComponentStyle = THEME => {
  return makeStyles(reactTheme => ({
    root: {
      boxSizing: 'border-box'
    },
    cardBody: {
      backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.mediumLightVersion})`,
      borderWidth: '0px',
      borderRadius: '1rem',
      boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
      color: THEME.fontColor
    },
    dashboardTile: {
      padding: '1rem',
      [reactTheme.breakpoints.down('sm')]: {
        padding: '0.5rem'
      }
    },
    figureWithCurrency: {
      marginTop: '1rem',
      [reactTheme.breakpoints.down('sm')]: {
        marginTop: '0.5rem'
      }
    },
    figure: {
      display: 'inline',
      [reactTheme.breakpoints.down('sm')]: {
        fontSize: '1.5rem'
      }
    },
    currency: {
      display: 'inline',
      marginRight: '0.5rem',
      [reactTheme.breakpoints.down('sm')]: {
        fontSize: '1rem'
      }
    }
  }));
};

function Summary(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" className={classes.container}>
        <Grid item className={classes.dashboardTile} xs={12} sm={4} md={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <Typography variant="body1">
                EXPENSE
              </Typography>
              <div className={classes.figureWithCurrency}>
                <Typography variant="h5" className={classes.currency}>₹</Typography>
                <Typography variant="h4" className={classes.figure}>
                  23,450.00
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.dashboardTile} xs={12} sm={4} md={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <Typography variant="body1">
                INCOME
              </Typography>
              <div className={classes.figureWithCurrency}>
                <Typography variant="h5" className={classes.currency}>₹</Typography>
                <Typography variant="h4" className={classes.figure}>
                  35,125.00
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.dashboardTile} xs={12} sm={4} md={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <Typography variant="body1">
                INVESTMENT
              </Typography>
              <div className={classes.figureWithCurrency}>
                <Typography variant="h5" className={classes.currency}>₹</Typography>
                <Typography variant="h4" className={classes.figure}>
                  15,650.00
                </Typography>
              </div>
            </CardContent>
          </Card>
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

export default connect(mapStateToProps)(Summary);
