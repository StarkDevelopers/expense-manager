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
    },
    cardTitle: {
      backgroundColor: '#BA042D',
      color: '#FFFFFF',
      padding: '2px 6px',
      fontFamily: "\"Anton\", sans-serif",
      display: 'inline',
      fontSize: '1.1rem'
    }
  }));
};

function styleCurrency(n) {
  let count = 0;
  const decimalPoints = (n % 1).toFixed(2).toString();
  let currencyString = '';
  n = Math.floor(n);
  while (n) {
    if (count % 3 === 0 && count !== 0) {
      currencyString = ',' + currencyString;
    }
    currencyString = Math.floor(n % 10) + currencyString;
    count++;
    n = Math.floor(n / 10);
  }

  currencyString = currencyString ? currencyString + decimalPoints.substring(1) : decimalPoints;

  return currencyString;
}

function Summary(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();

  const transactions = props.transactions || [];
  const income = transactions.filter(transaction => transaction.type === 'Income');
  const expense = transactions.filter(transaction => transaction.type === 'Expense');
  const investment = transactions.filter(transaction => transaction.type === 'Investment');
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" className={classes.container}>
        <Grid item className={classes.dashboardTile} xs={12} sm={4} md={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <Typography variant="body1" className={classes.cardTitle}>
                EXPENSE
              </Typography>
              <div className={classes.figureWithCurrency}>
                <Typography variant="h5" className={classes.currency}>₹</Typography>
                <Typography variant="h4" className={classes.figure}>
                  {
                    styleCurrency(expense.reduce((p, c) => p + c.amount, 0))
                  }
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.dashboardTile} xs={12} sm={4} md={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <Typography variant="body1" className={classes.cardTitle}>
                INCOME
              </Typography>
              <div className={classes.figureWithCurrency}>
                <Typography variant="h5" className={classes.currency}>₹</Typography>
                <Typography variant="h4" className={classes.figure}>
                  {
                    styleCurrency(income.reduce((p, c) => p + c.amount, 0))
                  }
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.dashboardTile} xs={12} sm={4} md={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <Typography variant="body1" className={classes.cardTitle}>
                INVESTMENT
              </Typography>
              <div className={classes.figureWithCurrency}>
                <Typography variant="h5" className={classes.currency}>₹</Typography>
                <Typography variant="h4" className={classes.figure}>
                  {
                    styleCurrency(investment.reduce((p, c) => p + c.amount, 0))
                  }
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
    THEME: state.theme,
    transactions: state.transactions
  };
};

export default connect(mapStateToProps)(Summary);
