import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function CircularIntegration(props) {
 const {onSubmit,loading,success}=props;
 console.log(success);
 console.log(loading);


const buttonSx = {
  ...(success && {
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[700],
    },
  }),
};





return (
  <Box sx={{ display: 'flex', alignItems: 'center',marginLeft:'30%' }}>
    <Box sx={{ m:1 , position: 'relative' }}>
      <Fab
        aria-label="save"
        color="primary"
        sx={buttonSx}
        onClick={onSubmit}
      >
        {success ? <CheckIcon /> : <SaveIcon />}
      </Fab>
      {loading && (
        <CircularProgress
          size={68}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={loading}
        onClick={onSubmit}
      >
        {props.children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  </Box>
);
}

