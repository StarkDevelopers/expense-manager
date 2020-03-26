import React from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Summary from './summary/Summary';
import SummaryChart from './summary-chart/SummaryChart';

const useStyles = makeStyles(theme => ({
}));

function Dashboard() {
	const classes = useStyles();
	return (
		<div>
			<Grid container>
				<Grid item xs={4}>
					<Summary />
				</Grid>
				<Grid item xs={8}>
					<SummaryChart />
				</Grid>
			</Grid>
		</div>
	);
}

export default Dashboard;
