import React from 'react';
import { Container, Grid, Typography, InputBase, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const field = (THEME) => {
  return {
    height: '3rem',
    fontFamily: "\"Ubuntu\", sans-serif",
    fontSize: '2rem',
    backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.mediumLightVersion})`,
    borderWidth: '0px',
    borderRadius: '0.75rem',
    boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
    color: THEME.fontColor,
    width: '100%',
    padding: '0.75rem',
    boxSizing: 'border-box',
    marginBottom: '1rem'
  };
};

const getComponentStyle = THEME => {
  return makeStyles(theme => ({
    container: {
      textAlign: 'left'
    },
    cardBody: {
      backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.mediumLightVersion})`,
      borderWidth: '0px',
      borderRadius: '1rem',
      boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
      color: THEME.fontColor
    },
    currency: {
      display: 'inline',
      color: THEME.fontColor
    },
    title: {
      color: THEME.fontColor,
      marginBottom: '1.25rem'
    },
    textField: field(THEME),
    selectField: {
      ...field(THEME),
      fontSize: '1rem',
      '&::before': {
        borderBottom: '0px !important'
      },
      '&::after': {
        borderBottom: '0px !important'
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
      ...field(THEME),
      textAlign: 'center',
      marginTop: '0.75rem',
      marginBottom: '0.25rem',
      fontSize: '1.25rem'
    }
  }));
}

const getMuiTheme = THEME => {
  return createMuiTheme({
    palette: {
      text: {
        primary: THEME.fontColor
      },
      background: {
        paper: THEME.mediumLightVersion
      },
      action: {
        selected: THEME.lightVersion,
        hover: THEME.lightVersion
      }
    }
  });
}

function AddTransactionCategory(props) {
  const theme = getMuiTheme(props.THEME);
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container}>
        <Grid container justify="flex-start" spacing={2} text-align="center">
          <Grid item xs={12}>
            <Card className={classes.cardBody}>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  Add Transaction Category
                </Typography>

                <InputBase
                  className={classes.textField}
                  type="text"
                  placeholder="Transaction Category"
                  inputProps={{ 'aria-label': 'naked' }} />

                <ThemeProvider theme={theme}>
                  <Select
                    className={classes.selectField}
                    id="demo-simple-select"
                    value={1}
                  >
                    <MenuItem value={1}>Income</MenuItem>
                    <MenuItem value={2}>Expense</MenuItem>
                    <MenuItem value={3}>Investment</MenuItem>
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

const mapStateToProps = state => {
  return {
    THEME: state.theme
  };
};

export default connect(mapStateToProps)(AddTransactionCategory);
