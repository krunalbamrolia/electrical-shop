import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { styled } from '@mui/system';

const MIN = 0;
const MAX = 2000;

const FilterContainer = styled(Box)({
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  width: '100%',
  textAlign: 'center'
});

const RangeFilter = ({ values, setValues }) => (
  <FilterContainer>
    <Typography variant="h6" gutterBottom>
      Price Range Filter
    </Typography>
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Slider
        value={values}
        min={MIN}
        max={MAX}
        onChange={(event, newValue) => setValues(newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        sx={{
          color: '#548BF4',
          width: '80%',
          marginBottom: '20px',
        }}
      />
      <Typography variant="body1" color="textSecondary">
        Selected Price Range: ${values[0]} - ${values[1]}
      </Typography>
    </Box>
  </FilterContainer>
);

export default RangeFilter;
