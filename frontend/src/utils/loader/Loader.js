import React from 'react';
import { Grid } from '@material-ui/core';
import Lottie from 'react-lottie';
import darkVersion from './animations/dark_version_loader.json';
import lightVersion from './animations/light_version_loader.json';

function Loader(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.lightVersion ? lightVersion : darkVersion,
  };

	return (
    <Grid container justify="center" alignItems="center" spacing={2} text-align="center" style={{ height: '100vh' }}>
      <Lottie options={defaultOptions}
        height={200}
        width={200}
        isStopped={false}
        isClickToPauseDisabled={true}
      />
    </Grid>
	);
}

export default Loader;
