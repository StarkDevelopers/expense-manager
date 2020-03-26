import React from 'react';
import { Container, Grid, InputAdornment, Typography, InputBase, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const field = {
  height: '3rem',
  fontFamily: "\"Ubuntu\", sans-serif",
  fontSize: '2rem',
  backgroundImage: 'linear-gradient(to right, #4c5378, #464d70)',
  borderWidth: '0px',
  borderRadius: '0.75rem',
  boxShadow: '3px 3px 5px 1px #2e324d',
  color: '#a8aed2',
  width: '100%',
  padding: '0.75rem',
  boxSizing: 'border-box',
  marginBottom: '1rem'
};

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'left'
  },
	cardBody: {
		backgroundImage: 'linear-gradient(to right, #4c5378, #464d70)',
		borderWidth: '0px',
		borderRadius: '1rem',
		boxShadow: '3px 3px 5px 1px #2e324d, -3px -3px 5px 1px #464d70',
		color: '#a8aed2'
	},
	currency: {
    display: 'inline',
    color: '#a8aed2'
  },
  title: {
    color: '#a8aed2',
    marginBottom: '1.25rem'
  },
  textField: field,
  selectField: {
    ...field,
    fontSize: '1rem',
    '&::before': {
      borderBottom: '0px !important'
    },
    '&::after': {
      borderBottom: '0px !important'
    },
    '&:hover': {

    },
    '&:hover': {
      '&::before': {
        borderBottom: '0px !important'
      },
      '&::after': {
        borderBottom: '0px !important'
      }
    }
  },
  buttonField: {
    ...field,
    textAlign: 'center',
    marginTop: '0.75rem',
    marginBottom: '0.25rem',
    fontSize: '1.25rem'
  }
}));

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#a8aed2'
    },
    background: {
      paper: "#464d70"
    },
    action: {
      selected: '#4c5378',
      hover: '#4c5378'
    }
  }
});

function AddTransaction() {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container}>
        <Grid container justify="flex-start" spacing={2} text-align="center" className={classes.gridContainer}>
          <Grid item xs={12}>
            <Card className={classes.cardBody}>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  Add Transaction
                </Typography>

                <InputBase
                  className={classes.textField}
                  type="number"
                  placeholder="Transaction amount"
                  startAdornment={<InputAdornment position="start"><Typography variant="h5" className={classes.currency}>₹</Typography></InputAdornment>}
                  inputProps={{ 'aria-label': 'naked' }} />

                <ThemeProvider theme={theme}>
                  <Select
                    className={classes.selectField}
                    id="demo-simple-select"
                    value={0}
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>Salary</MenuItem>
                    <MenuItem value={2}>Freelancing</MenuItem>
                    <MenuItem value={3}>Shopping</MenuItem>
                  </Select>
                </ThemeProvider>

                <Typography className={classes.buttonField}>
                  Add
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AddTransaction;
