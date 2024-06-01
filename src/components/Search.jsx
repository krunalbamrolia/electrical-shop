
import React, { useState } from 'react';
import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const CustomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '16px',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  width: '100%',  
});

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  '& .MuiInputLabel-root': {
    color: '#4caf50',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#4caf50',
    },
  },
  width: '100%',   
});

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <CustomBox>
      <CustomTextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
        variant="outlined"
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon style={{ color: '#4caf50' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </CustomBox>
  );
};

export default Search;
