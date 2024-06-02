import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography, Modal, Select, MenuItem, InputLabel, FormControl, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const JsonItem = ({ item, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{item.brand}</TableCell>
      <TableCell>{item.model}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(item)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(item.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>

    </TableRow>
  );
}

const ModelPage = () => {
  const [jsonData, setJsonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); //search
  const [newItem, setNewItem] = useState({ category: '', brand: '', model: '' });
  const [editItem, setEditItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3010/models')
      .then(response => {
        setJsonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchCategories = () => {
    axios.get('http://localhost:3010/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchBrands = () => {
    axios.get('http://localhost:3010/brands')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (editItem) {
      axios.put(`http://localhost:3010/models/${editItem.id}`, newItem)
        .then(response => {
          console.log('Item updated successfully:', response.data);
          setEditItem(null);
          setNewItem({ category: '', brand: '', model: '' });
          setOpenPopup(false);
          // fetchBrands();
          fetchData();
        })
        .catch(error => {
          console.error('Error updating item:', error);
        });
    } else {
      axios.post('http://localhost:3010/models', newItem)
        .then(response => {
          console.log('Item added successfully:', response.data);
          setNewItem({ category: '', brand: '', model: '' });
          setOpenPopup(false);
          // fetchBrands();
          fetchData();
        })
        .catch(error => {
          console.error('Error adding item:', error);
        });
    }
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditItem(null);
    setNewItem({ category: '', brand: '', model: '' });
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setNewItem({ category: item.category, brand: item.brand, model:item.model });
    setOpenPopup(true);
  };

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:3010/models/${id}`)
      .then(response => {
        console.log('Item deleted successfully:', response.data);
        // fetchBrands();
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const filteredData = jsonData.filter(item =>
    item.model && item.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const classes = makeStyles({
    table: {
      minWidth: 650,
    },
    searchInput: {
      marginBottom: 20,
      width: 300,
    },
    addButton: {
      marginBottom: 20,
      marginRight: 20,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'white',
      padding: 20,
      outline: 'none',
      borderRadius: 8,
    },
  })();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Model Page
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 15 }} >
        <TextField
          className={classes.searchInput}
          label="Search Model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button className={classes.addButton} onClick={handleOpenPopup} variant="contained" color="primary">Add New Model</Button>
      </div>

      <Modal
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="add-item-modal-title"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Add New Model
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="brand-label">Brand</InputLabel>
            <Select
              labelId="brand-label"
              name="brand"
              value={newItem.brand}
              onChange={handleInputChange}
            >
              {brands.map(brand => (
                <MenuItem key={brand.id} value={brand.name}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Model Name"
            value={newItem.model}
            onChange={handleInputChange}
            name="model"
            margin="normal"
            required
          />
          {/* <Button onClick={handleAddItem} variant="contained" color="primary" style={{ margin: 10 }}>Add</Button>
          <Button onClick={handleClosePopup} variant="contained" style={{ margin: 10 }}>Cancel</Button> */}
          <Button onClick={handleAddItem} variant="contained" color="primary" style={{margin:10}}>
            {editItem ? 'Update' : 'Add'}
          </Button>
          <Button onClick={handleClosePopup} variant="contained" style={{margin:10}}>Cancel</Button>
        </div>
      </Modal>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(item => (
              <JsonItem key={item.id} item={item}  onEdit={handleEditItem} onDelete={handleDeleteItem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
      <Button onClick={() => handleChangePage(page + 1)} disabled={page * rowsPerPage >= filteredData.length}>Next</Button>
    </div>
  );
}

export default ModelPage;
