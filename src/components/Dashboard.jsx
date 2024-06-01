import React, { useState } from 'react';
import { Box, Button, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Search from './Search';
import RangeFilter from './RangeFilter';
import Data from './Data';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px', 
  margin: '0 auto', 
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
});

const CustomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '16px',
});

const ContentBox = styled(Box)({
  padding: '20px',
  backgroundColor: '#fff',
  width: '100%',
  overflowY: 'auto',
});

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [values, setValues] = useState([0, 2000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleDrawer = (open) => {
    setIsFilterOpen(open);
  };

  return (
    <Container>
      <CustomBox>
        <Search onSearch={handleSearch} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleDrawer(true)}
          style={{ height: 'fit-content', marginLeft: '20px' }}
        >
          Filter Range
        </Button>
      </CustomBox>
      <Drawer anchor="right" open={isFilterOpen} onClose={() => toggleDrawer(false)}>
        <Box
          p={2}
          width="310px" 
          role="presentation"
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => toggleDrawer(false)} style={{ color: 'red' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <RangeFilter values={values} setValues={setValues} />
        </Box>
      </Drawer>
      <ContentBox>
        <Data searchTerm={searchTerm} values={values} />
      </ContentBox>
    </Container>
  );
};

export default Dashboard;
