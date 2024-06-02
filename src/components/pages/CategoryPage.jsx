import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography, Modal, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const JsonItem = ({ item, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
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

const CategoryPage = () => {
  const [jsonData, setJsonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({ name: '' });
  const [editItem, setEditItem] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3010/categories')
      .then(response => {
        setJsonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (editItem) {
      axios.put(`http://localhost:3010/categories/${editItem.id}`, newItem)
        .then(response => {
          console.log('Item updated successfully:', response.data);
          setEditItem(null);
          setNewItem({ name: ''});
          setOpenPopup(false);
          fetchData();
        })
        .catch(error => {
          console.error('Error updating item:', error);
        });
    } else {
      axios.post('http://localhost:3010/categories', newItem)
        .then(response => {
          console.log('Item added successfully:', response.data);
          setNewItem({ name: ''});
          setOpenPopup(false);
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
    setNewItem({ name: ''});
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setNewItem({ name: item.name });
    setOpenPopup(true);
  };

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:3010/categories/${id}`)
      .then(response => {
        console.log('Item deleted successfully:', response.data);
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        Category Page
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 15 }} >
      <TextField
        className={classes.searchInput}
        label="Search Category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Button className={classes.addButton} onClick={handleOpenPopup} variant="contained" color="primary">Add New Item</Button>
    </div>
      <Modal
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="add-item-modal-title"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {editItem ? 'Edit Item' : 'Add New Item'}
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={newItem.name}
            onChange={handleInputChange}
            name="name"
            margin="normal"
            required
          />
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
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(item => (
              <JsonItem key={item.id} item={item} onEdit={handleEditItem} onDelete={handleDeleteItem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
      <Button onClick={() => handleChangePage(page + 1)} disabled={page * rowsPerPage >= filteredData.length}>Next</Button>
    </div>
  );
}

export default CategoryPage;
