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
    }
  }));
}

const transactions = [
  {
    type: 'Shopping',
    date: '28-03-2020',
    amount: 3450.00,
    description: 'Myntra - 4 Shirts'
  },
  {
    type: 'Salary',
    date: '28-03-2020',
    amount: 43450.00,
    description: 'Job Salary'
  },
  {
    type: 'Shopping',
    date: '28-03-2020',
    amount: 13450.00,
    description: 'Flipkart - computer table'
  },
  {
    type: 'IT Services',
    date: '28-03-2020',
    amount: 450.00,
    description: 'AWS - Lambda, ECS'
  },
  {
    type: 'Shopping',
    date: '18-03-2020',
    amount: 3450.00,
    description: 'Lorem Ipsum is simply dummy text of print print print text of print print print'
  },
  {
    type: 'Shopping',
    date: '28-03-2020',
    amount: 3450.00,
    description: 'Myntra - 4 Shirts'
  },
  {
    type: 'Freelancing',
    date: '12-03-2020',
    amount: 33450.00,
    description: 'Upwork - Luca, Praneeth, Varun'
  },
  {
    type: 'Shopping',
    date: '28-03-2020',
    amount: 3450.00,
    description: 'Myntra - 4 Shirts'
  },
  {
    type: 'Shopping',
    date: '28-03-2020',
    amount: 3450.00,
    description: 'Myntra - 4 Shirts'
  },
  {
    type: 'Freelancing',
    date: '12-03-2020',
    amount: 33450.00,
    description: 'Upwork - Luca, Praneeth, Varun'
  },
  {
    type: 'Shopping',
    date: '28-03-2020',
    amount: 3450.00,
    description: 'Lorem Ipsum is simply dummy text of print text of print print print'
  },
];

function Transactions(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        {transactions.map((transaction, index) => (
          <Grid item className={classes.dashboardTile} xs={12} sm={6} md={4} key={index}>
            <Card className={classes.cardBody}>
              <CardContent className={classes.cartContent}>
                <Typography variant="body1" className={classes.category}>
                  {transaction.type}
                </Typography>
                <Typography variant="body1" className={classes.date}>
                  {transaction.date}
                </Typography>
                <Typography variant="h5" className={classes.figure}>
                  <Typography variant="body1" className={classes.currency}>₹</Typography> {transaction.amount}
                </Typography>
                <Typography variant="body1">
                  {transaction.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    THEME: state.theme
  };
};

export default connect(mapStateToProps)(Transactions);
