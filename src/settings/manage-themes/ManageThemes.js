import React from 'react';
import { Grid, Container, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { THEMES } from '../../themes/themes';

const cardBodyStyle = THEME => {
  return {
    backgroundImage: `linear-gradient(to right, ${THEME.lightVersion}, ${THEME.mediumDarkVersion})`,
    borderWidth: '0px',
    borderRadius: '1rem',
    boxShadow: `3px 3px 5px 1px ${THEME.boxShadow}`,
    color: THEME.fontColor
  }
};

const getComponentStyle = THEME => {
  return makeStyles(reactTheme => ({
    root: {
      [reactTheme.breakpoints.down('xs')]: {
        marginTop: '1rem',
        marginRight: '0.5rem'
      }
    },
    container: {
      textAlign: 'left',
    },
    cardBody: cardBodyStyle(THEME),
    cardContainer: {
      paddingRight: '0px !important',
      marginTop: '1rem'
    },
    dashboardTile: {
      padding: '8px'
    },
    themeCardBody: {
      ...cardBodyStyle(THEME),
      '& :hover': {
        cursor: 'pointer'
      }
    },
    cardContent: {
      paddingTop: '0.5rem !important',
      paddingBottom: '0.5rem !important'
    }
  }));
}

function ManageThemes(props) {
  const useStyles = getComponentStyle(props.THEME);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid container justify="flex-start" spacing={2} text-align="center">
          <Grid item xs={12} className={classes.cardContainer}>
            <Card className={classes.cardBody}>
              <CardContent className={classes.cardContent}>
                <Typography>
                  Themes
                </Typography>
                <Grid container>
                  {THEMES.filter(t => t.name !== props.THEME.name).map((theme, index) => (
                    <Grid item className={classes.dashboardTile} xs={6} sm={3} key={index} >
                      <Card
                        className={classes.themeCardBody}
                        style={{ backgroundImage: `linear-gradient(to right, ${theme.lightVersion}, ${theme.mediumDarkVersion})`, boxShadow: `3px 3px 5px 1px ${theme.boxShadow}` }}
                        onClick={() => { props.onThemeChange(theme.name); }}
                      >
                        <CardContent>
                          <Typography variant="body1" style={{ 'color': theme.fontColor }}>
                            {theme.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
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

const mapDispatchToProps = dispatch => {
  return {
    onThemeChange: theme => dispatch({ type: 'THEME_CHANGE', themeName: theme })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageThemes);
