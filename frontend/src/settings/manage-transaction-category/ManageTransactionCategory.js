import React from 'react';
import { Grid } from '@material-ui/core';
import AddTransactionCategory from './add-transaction-category/AddTransactionCategory';
import TransactionCategories from './transction-categories/TransactionCategories';

function ManageTransactionCategory() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={7} md={5}>
          <AddTransactionCategory />
        </Grid>
        <Grid item xs={12} sm={5} md={7}>
          <TransactionCategories />
        </Grid>
      </Grid>
    </div>
  );
}

export default ManageTransactionCategory;
