import React from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const getComponentStyle = THEME => {
  return makeStyles(reactTheme => ({
    root: {
      boxSizing: 'border-box',
      textAlign: 'left',
      maxHeight: '460px',
      overflow: 'auto',
      marginRight: '1rem'
    },
    cardBody: {
      backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.mediumLightVersion})`,
      borderWidth: '0px',
      borderRadius: '1rem',
      boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
      color: THEME.fontColor,
      height: '100%'
    },
    cartContent: {
      paddingBottom: '16px !important'
    },
    dashboardTile: {
      padding: '16px'
    },
    figure: {
      marginTop: '8px'
    },
    currency: {
      display: 'inline'
    },
    category: {
      display: 'inline'
    },
    date: {
      display: 'inline',
      float: 'right'
    },
    noTransaction: {
      marginLeft: '2rem'
    }
  }));
}

function Transactions(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();

  const transactions = props.transactions || [];
  return (
    <div className={classes.root}>
      <Grid container>
        {transactions.map((transaction, index) => (
          <Grid item className={classes.dashboardTile} xs={12} sm={6} md={4} key={index}>
            <Card className={classes.cardBody}>
              <CardContent className={classes.cartContent}>
                <Typography variant="body1" className={classes.category}>
                  {transaction.transactionType}
                </Typography>
                <Typography variant="body1" className={classes.date}>
                  {new Date(transaction.date).toJSON().substr(0, 10)}
                </Typography>
                <Typography variant="h5" className={classes.figure}>
                  <Typography variant="body1" className={classes.currency}>₹</Typography> {transaction.amount}
                </Typography>
                <Typography variant="caption">
                  {transaction.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {
          !transactions.length && <Typography variant="caption" className={classes.noTransaction}>No Transaction found</Typography>
        }
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

export default connect(mapStateToProps)(Transactions);
