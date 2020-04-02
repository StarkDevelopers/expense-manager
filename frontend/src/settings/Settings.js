import React from 'react';
import { Grid } from '@material-ui/core';
import ManageTransactionCategory from './manage-transaction-category/ManageTransactionCategory';
import ManageThemes from './manage-themes/ManageThemes';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const getComponentStyle = () => {
  return makeStyles(reactTheme => ({
  }));
}

function ManageTransactions(props) {
  const useStyles = getComponentStyle();
  const classes = useStyles();
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <ManageTransactionCategory />
        </Grid>
        <Grid item xs={12}>
          <ManageThemes />
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

export default connect(mapStateToProps)(ManageTransactions);
