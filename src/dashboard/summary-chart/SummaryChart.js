import React, { useEffect } from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';

const useStyles = makeStyles(theme => ({
    cardBody: {
		backgroundImage: 'linear-gradient(to right, #4c5378, #464d70)',
		borderWidth: '0px',
		borderRadius: '1rem',
		boxShadow: '3px 3px 5px 1px #2e324d',
		color: '#a8aed2'
	},
	dashboardTile: {
		padding: '16px'
	}
}));

function SummaryChart() {
    const classes = useStyles();
    const chartRef = React.createRef();
    
    useEffect(() => {
        const summaryChartRef = chartRef.current.getContext("2d");
        Chart.defaults.global.legend.display = false;
        Chart.defaults.global.defaultFontFamily = "\"Ubuntu\", sans-serif";
        Chart.defaults.global.defaultFontColor = '#a8aed2';
        new Chart(summaryChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Expense",
                        data: [42560, 20175, 23450],
                        backgroundColor: 'rgba(71, 76, 110, 0.6)',
                        borderColor: 'rgba(53, 58, 88, 0.8)'
                    },
                    {
                        label: "Income",
                        data: [27316, 36980, 35125],
                        backgroundColor: 'rgba(71, 76, 110, 0.6)',
                        borderColor: 'rgba(168, 174, 210, 0.8)'
                    }
                ]
            },
            options: {
                //Customize chart options
                tooltips: {
                    bodyFontColor: '#a8aed2',
                    titleFontColor: '#a8aed2',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    displayColors: false,
                    mode: 'index',
                }
            }
        });
    }, []);

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

export default SummaryChart;
