import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    open: true
  });
  const { open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        message={props.message}
        key={'top-center'}
      />
    </div>
  );
}
