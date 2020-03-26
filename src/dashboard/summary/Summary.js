import React from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		boxSizing: 'border-box'
	},
	cardBody: {
		backgroundImage: 'linear-gradient(to right, #4c5378, #464d70)',
		borderWidth: '0px',
		borderRadius: '1rem',
		boxShadow: '3px 3px 5px 1px #2e324d',
		color: '#a8aed2'
	},
	dashboardTile: {
		padding: '16px'
	},
	figure: {
		marginTop: '16px'
	},
	currency: {
		display: 'inline'
	}
}));

function Summary() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
            <Grid container direction="column" justify="center" alignItems="stretch" className={classes.container}>
                <Grid item className={classes.dashboardTile}>
                    <Card className={classes.cardBody}>
                        <CardContent>
                            <Typography variant="body1">
                                EXPENSE
                            </Typography>
                            <Typography variant="h4" className={classes.figure}>
                                <Typography variant="h5" className={classes.currency}>₹</Typography> 23,450.00
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item className={classes.dashboardTile}>
                    <Card className={classes.cardBody}>
                        <CardContent>
                            <Typography variant="body1">
                                INCOME
                            </Typography>
                            <Typography variant="h4" className={classes.figure}>
                                <Typography variant="h5" className={classes.currency}>₹</Typography> 35,125.00
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item className={classes.dashboardTile}>
                    <Card className={classes.cardBody}>
                        <CardContent>
                            <Typography variant="body1">
                                INVESTMENT
                            </Typography>
                            <Typography variant="h4" className={classes.figure}>
                                <Typography variant="h5" className={classes.currency}>₹</Typography> 15,650.00
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
		</div>
	);
}

export default Summary;
