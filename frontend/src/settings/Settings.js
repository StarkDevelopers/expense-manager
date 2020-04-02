import React from 'react';
import { Grid } from '@material-ui/core';
import ManageTransactionCategory from './manage-transaction-category/ManageTransactionCategory';
import ManageThemes from './manage-themes/ManageThemes';
import { connect } from 'react-redux';

function ManageTransactions(props) {
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
