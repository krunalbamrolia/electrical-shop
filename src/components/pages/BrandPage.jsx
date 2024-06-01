// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography, Modal } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const JsonItem = ({ item }) => {
//   return (
//     <TableRow>
//       <TableCell>{item.id}</TableCell>
//       <TableCell>{item.name}</TableCell>
//     </TableRow>
//   );
// }

// const BrandPage = () => {
//   const [brandData, setBrandData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newBrand, setNewBrand] = useState({ name: '' });
//   const [openPopup, setOpenPopup] = useState(false);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(10);

//   useEffect(() => {
//     fetchBrands();
//   }, []);

//   const fetchBrands = () => {
//     axios.get('http://localhost:3010/brands')
//       .then(response => {
//         setBrandData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching brand data:', error);
//       });
//   }

//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setNewBrand(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleAddBrand = () => {
//     axios.post('http://localhost:3010/brands', newBrand)
//       .then(response => {
//         console.log('Brand added successfully:', response.data);
//         setNewBrand({ name: '' });
//         setOpenPopup(false);
//         fetchBrands();
//       })
//       .catch(error => {
//         console.error('Error adding brand:', error);
//       });
//   };

//   const handleOpenPopup = () => {
//     setOpenPopup(true);
//   };

//   const handleClosePopup = () => {
//     setOpenPopup(false);
//   };

//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };

//   const filteredData = brandData.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const classes = makeStyles({
//     table: {
//       minWidth: 650,
//     },
//     searchInput: {
//       marginBottom: 20,
//       width: 300,
//     },
//     addButton: {
//       marginBottom: 20,
//       marginRight: 20,
//     },
//     modal: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     paper: {
//       backgroundColor: 'white',
//       padding: 20,
//       outline: 'none',
//       borderRadius: 8,
//     },
//   })();

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Brand Page
//       </Typography>

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 15 }} >
//         <TextField
//           className={classes.searchInput}
//           label="Search Brand"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <Button className={classes.addButton} onClick={handleOpenPopup} variant="contained" color="primary">Add New Brand</Button>
//       </div>

//       <Modal
//         open={openPopup}
//         onClose={handleClosePopup}
//         aria-labelledby="add-item-modal-title"
//         aria-describedby="add-item-modal-description"
//         className={classes.modal}
//       >
//         <div className={classes.paper}>
//           <Typography variant="h6" gutterBottom>
//             Add New Brand
//           </Typography>
//           <TextField
//             fullWidth
//             label="Name"
//             value={newBrand.name}
//             onChange={handleInputChange}
//             name="name"
//             margin="normal"
//             required
//           />
//           <Button onClick={handleAddBrand} variant="contained" color="primary" style={{margin:10}}>Add</Button>
//           <Button onClick={handleClosePopup} variant="contained" style={{margin:10}}>Cancel</Button>
//         </div>
//       </Modal>

//       <TableContainer component={Paper}>
//         <Table className={classes.table}>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(item => (
//               <JsonItem key={item.id} item={item} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
//       <Button onClick={() => handleChangePage(page + 1)} disabled={page * rowsPerPage >= filteredData.length}>Next</Button>
//     </div>
//   );
// }

// export default BrandPage;






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

const BrandPage = () => {
  const [brandData, setBrandData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBrand, setNewBrand] = useState({ name: '' });
  const [editItem, setEditItem] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = () => {
    axios.get('http://localhost:3010/brands')
      .then(response => {
        setBrandData(response.data);
      })
      .catch(error => {
        console.error('Error fetching brand data:', error);
      });
  }

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewBrand(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (editItem) {
      axios.put(`http://localhost:3010/brands/${editItem.id}`, newBrand)
        .then(response => {
          console.log('Item updated successfully:', response.data);
          setEditItem(null);
          setNewBrand({ name: '' });
          setOpenPopup(false);
          fetchBrands();
        })
        .catch(error => {
          console.error('Error updating item:', error);
        });
    } else {
      axios.post('http://localhost:3010/brands', newBrand)
        .then(response => {
          console.log('Item added successfully:', response.data);
          setNewBrand({ name: '' });
          setOpenPopup(false);
          fetchBrands();
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
    setNewBrand({ name: '' });
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setNewBrand({ name: item.name });
    setOpenPopup(true);
  };

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:3010/brands/${id}`)
      .then(response => {
        console.log('Item deleted successfully:', response.data);
        fetchBrands();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const filteredData = brandData.filter(item =>
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
        Brand Page
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 15 }} >
        <TextField
          className={classes.searchInput}
          label="Search Brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button className={classes.addButton} onClick={handleOpenPopup} variant="contained" color="primary">Add New Brand</Button>
      </div>

      <Modal
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="add-item-modal-title"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Add New Brand
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={newBrand.name}
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

export default BrandPage;
