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

  useEffect(() => {
    const summaryChartRef = chartRef.current.getContext("2d");
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.defaultFontFamily = "\"Ubuntu\", sans-serif";
    Chart.defaults.global.defaultFontColor = props.THEME.fontColor;
    new Chart(summaryChartRef, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Expense",
            data: [42560, 20175, 23450],
            backgroundColor: `${props.THEME.mediumLightVersion}99`,
            borderColor: `${props.THEME.darkVersion}CC`
          },
          {
            label: "Income",
            data: [27316, 36980, 35125],
            backgroundColor: `${props.THEME.mediumLightVersion}99`,
            borderColor: `${props.THEME.fontColor}CC`
          }
        ]
      },
      options: {
        tooltips: {
          bodyFontColor: props.THEME.fontColor,
          titleFontColor: props.THEME.fontColor,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          displayColors: false,
          mode: 'index',
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
    THEME: state.theme
  };
};

export default connect(mapStateToProps)(SummaryChart);
