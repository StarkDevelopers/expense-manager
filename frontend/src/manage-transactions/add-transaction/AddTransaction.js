import React, { useState }  from 'react';
import { Container, Grid, InputAdornment, Typography, InputBase, Select, MenuItem, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const field = (THEME) => {
  return {
    height: '3rem',
    fontFamily: "\"Ubuntu\", sans-serif",
    fontSize: '2rem',
    backgroundImage: `linear-gradient(to right, ${THEME.mediumLightVersion}, ${THEME.mediumDarkVersion})`,
    borderWidth: '0px',
    borderRadius: '0.75rem',
    boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
    color: THEME.fontColor,
    width: '100%',
    padding: '0.75rem',
    boxSizing: 'border-box',
    marginBottom: '1rem'
  }
};

const getComponentStyle = THEME => {
  return makeStyles(reactTheme => ({
    container: {
      textAlign: 'left'
    },
    cardBody: {
      backgroundImage: `linear-gradient(to right, ${THEME.mediumLightVersion}, ${THEME.mediumDarkVersion})`,
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
    descriptionField: {
      ...field(THEME),
      fontSize: '1.25rem'
    },
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
};

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
};

function AddTransaction(props) {
  const theme = getMuiTheme(props.THEME);
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();

  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState('');
  const transactionCategories = props.transactionCategories || [];

  const submitTransaction = () => {
    props.addTransaction(amount, category, description);
    setAmount(0);
    setCategory(0);
    setDescription('');
  }

  return (
    <div>
      <Container className={classes.container}>
        <Grid container justify="flex-start" spacing={2} text-align="center">
          <Grid item xs={12}>
            <Card className={classes.cardBody}>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  Add Transaction
                </Typography>

                <InputBase
                  className={classes.textField}
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Transaction amount"
                  startAdornment={<InputAdornment position="start"><Typography variant="h5" className={classes.currency}>₹</Typography></InputAdornment>}
                  inputProps={{ 'aria-label': 'naked' }} />

                <ThemeProvider theme={theme}>
                  <Select
                    className={classes.selectField}
                    id="demo-simple-select"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    {
                      transactionCategories.map(category => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      ))
                    }
                  </Select>
                </ThemeProvider>

                <InputBase
                  className={classes.descriptionField}
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Description"
                  inputProps={{ 'aria-label': 'naked' }} />

                <Button className={classes.buttonField}
                  onClick={submitTransaction}
                  disabled={!amount || !category}>
                  Add
                </Button>
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
    THEME: state.theme,
    transactionCategories: state.transactionCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: (amount, category, description) => dispatch({ type: 'ADD_TRANSACTION', amount, category, description }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
