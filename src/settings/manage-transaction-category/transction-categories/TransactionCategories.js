import React from 'react';
import { Grid, Card, CardContent, Chip, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const style = THEME => {
  return {
    backgroundImage: `linear-gradient(to right, ${THEME.mediumLightVersion}, ${THEME.mediumDarkVersion})`,
    borderWidth: '0px',
    borderRadius: '1rem',
    boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
    color: THEME.fontColor
  }
};

const getComponentStyle = THEME => {
  return makeStyles(reactTheme => ({
    root: {
      height: '100%',
      [reactTheme.breakpoints.down('xs')]: {
        paddingLeft: '1rem',
        marginTop: '1rem'
      }
    },
    container: {
      height: '100%'
    },
    cardBody: {
      ...style(THEME),
      height: '100%',
      [reactTheme.breakpoints.down('xs')]: {
        backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.mediumLightVersion})`
      }
    },
    dashboardTile: {
      paddingRight: '16px',
    },
    title: {
      color: THEME.fontColor,
      marginBottom: '1.25rem'
    },
    categoriesContainer: {
      maxHeight: '12rem',
      overflowY: 'auto'
    }
  }));
}

const getStyledChip = THEME => {
  return withStyles({
    root: {
      ...style(THEME),
      fontSize: '1rem',
      margin: '8px',
      '& path': {
        color: THEME.fontColor
      }
    }
  })(Chip);
};

function TransactionCategories(props) {
  const StyleChip = getStyledChip(props.THEME);
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item className={classes.dashboardTile} xs={12}>
          <Card className={classes.cardBody}>
            <CardContent>
              <Typography className={classes.title}>
                Transaction Categories
              </Typography>
              <div className={classes.categoriesContainer}>
                <StyleChip
                  size="medium"
                  label="Salary"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Freelancing"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Shopping"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Trip"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Food"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Transportation"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="IT Services"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Salary"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Freelancing"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Shopping"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Trip"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Food"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Transportation"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="IT Services"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Salary"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Freelancing"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Shopping"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Trip"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Food"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="Transportation"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
                <StyleChip
                  size="medium"
                  label="IT Services"
                  deleteIcon={<Clear />}
                  onDelete={() => {}}
                />
              </div>
            </CardContent>
          </Card>
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

export default connect(mapStateToProps)(TransactionCategories);
