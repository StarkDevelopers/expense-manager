import React from 'react';
import { Grid } from '@material-ui/core';
import Summary from './summary/Summary';
import SummaryChart from './summary-chart/SummaryChart';

function Dashboard() {
	return (
		<div>
			<Grid container>
				<Grid item xs={12} md={4}>
					<Summary />
				</Grid>
				<Grid item xs={12} md={8}>
					<SummaryChart />
				</Grid>
			</Grid>
		</div>
	);
}

export default Dashboard;
