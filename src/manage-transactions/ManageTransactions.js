import React from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddTransaction from './add-transaction/AddTransaction';

const useStyles = makeStyles(theme => ({
}));

function ManageTransactions() {
	const classes = useStyles();
	return (
		<div>
			<Grid container>
				<Grid item xs={5}>
					<AddTransaction />
				</Grid>
				<Grid item xs={7}>
                    <Typography>Row 7</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

export default ManageTransactions;
