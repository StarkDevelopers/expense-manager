import React from 'react';
import { Grid } from '@material-ui/core';
import AddTransaction from './add-transaction/AddTransaction';

function ManageTransactions() {
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={5}>
          <AddTransaction />
        </Grid>
      </Grid>
    </div>
  );
}

export default ManageTransactions;
