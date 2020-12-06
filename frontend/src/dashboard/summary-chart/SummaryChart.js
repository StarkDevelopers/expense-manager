import React, { useEffect } from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';
import { connect } from 'react-redux';

const getComponentStyle = THEME => {
  return makeStyles(reactTheme => ({
    cardBody: {
      backgroundImage: `linear-gradient(to right, ${THEME.mediumLightVersion}, ${THEME.mediumDarkVersion})`,
      borderWidth: '0px',
      borderRadius: '1rem',
      boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
      color: THEME.fontColor,
      [reactTheme.breakpoints.down('sm')]: {
        backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.mediumLightVersion})`
      }
    },
    dashboardTile: {
      padding: '16px'
    }
  }));
};

function SummaryChart(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();
  const chartRef = React.createRef();

  const transactions = props.transactions || [];
  const income = transactions.filter(transaction => transaction.type === 'Income').reduce((p, c) => p + c.amount, 0);
  const expense = transactions.filter(transaction => transaction.type === 'Expense').reduce((p, c) => p + c.amount, 0);
  const investment = transactions.filter(transaction => transaction.type === 'Investment').reduce((p, c) => p + c.amount, 0);

  useEffect(() => {
    const summaryChartRef = chartRef.current.getContext("2d");
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.defaultFontFamily = "\"Ubuntu\", sans-serif";
    Chart.defaults.global.defaultFontColor = props.THEME.fontColor;
    new Chart(summaryChartRef, {
      type: "bar",
      data: {
        labels: ["Expense", "Income", "Investment"],
        datasets: [{
          maxBarThickness: 80,
          backgroundColor: props.THEME.lightBackground + '66',
          data: [expense, income, investment]
        }]
      },
      options: {
        tooltips: {
          bodyFontColor: props.THEME.fontColor,
          titleFontColor: props.THEME.fontColor,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          displayColors: false,
          mode: 'index',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }, [chartRef, props.THEME.fontColor, props.THEME.mediumLightVersion, props.THEME.darkVersion]);

  return (
    <div>
      <Grid container>
        <Grid item className={classes.dashboardTile} xs={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <canvas id="myChart" ref={chartRef} />
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

export default connect(mapStateToProps)(SummaryChart);
