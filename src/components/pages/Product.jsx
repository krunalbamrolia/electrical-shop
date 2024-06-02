import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Checkbox, Button, Dialog, DialogTitle, CircularProgress, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination,
  TextField,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2';
import AddProduct from './Addproduct';
import EditProduct from './EditProduct'; // Import EditProduct component
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '20px',
  },
  card: {
    minWidth: 275,
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'transform 0.5s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  selectedCard: {
    border: '2px solid blue',
  },
  bestProduct: {
    border: '2px solid green',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  comparisonTable: {
    '& .MuiTableCell-head': {
      fontWeight: 'bold',
    },
    '& .bestProduct': {
      backgroundColor: 'lightgreen',
    },
  },
  compareButton: {
    marginTop: '10px',
    width: '100%',
  },
});

const Product = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false); // State for view dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State for edit dialog
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [comparisonData, setComparisonData] = useState(null);
  const role = localStorage.getItem('role');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3010/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        showError('Error fetching data');
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter((p) => p !== product);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  const findBestProduct = (products) => {
    if (products.length === 0) return null;
    return products.reduce((best, current) =>
      current.releaseYear > best.releaseYear ? current : best
    );
  };

  const compareProducts = () => {
    if (selectedProducts.length < 2) {
      showError('Select at least two products to compare');
      return;
    }
    if (selectedProducts.some((product) => product.category !== selectedProducts[0].category)) {
      showError('All selected products must be from the same category');
      return;
    }
    setError('');
    const bestProduct = findBestProduct(selectedProducts);
    setComparisonData(selectedProducts.map((product) => ({
      ...product,
      isBest: product.id === bestProduct.id,
    })));
    setDialogOpen(true);
    // Deselect cards after comparison
    setSelectedProducts([]);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setComparisonData(null);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (updatedProduct) => {
    setLoading(true);
    fetch(`http://localhost:3010/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts(products.map(product => product.id === data.id ? data : product));
        setLoading(false);
        setEditDialogOpen(false);
        setSelectedProduct(null);
        Swal.fire('Success', 'Product updated successfully', 'success');
      })
      .catch(error => {
        console.error('Error updating product:', error);
        showError('Error updating product');
        setLoading(false);
      });
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3010/products/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              setProducts(products.filter(product => product.id !== id));
              Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
              );
            } else {
              throw new Error('Failed to delete product');
            }
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            showError('Error deleting product');
          });
      }
    });
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container className={classes.root}>
      {role === 'admin' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 15 }} >
            <AddProduct />
            <span >
              <TextField
                style={{ width: '25rem' }}
                className={classes.searchInput}
                label="Search Model"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Release Year</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.releaseYear}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewProduct(product)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditProduct(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
      {role === 'user' && (
        <Grid container spacing={3}>
          {loading && (
            <Grid item xs={12} className={classes.loadingContainer}>
              <CircularProgress />
            </Grid>
          )}
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                className={`${classes.card} ${selectedProducts.includes(product) ? classes.selectedCard : ''} ${product.isBest ? classes.bestProduct : ''}`}
                onClick={() => handleSelectProduct(product)}
              >
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {product.category}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Model: {product.model}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Brand: {product.brand}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Release Year: {product.releaseYear}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Features:
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </Typography>
                  <Checkbox
                    checked={selectedProducts.includes(product)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectProduct(product);
                    }}
                    inputProps={{ 'aria-label': 'select product for comparison' }}
                  />
                  Select for comparison
                  {selectedProducts.includes(product) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        compareProducts();
                      }}
                      className={classes.compareButton}
                    >
                      Compare Selected Products
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>)}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle>Comparison Result</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table className={classes.comparisonTable}>
              <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  {comparisonData?.map((product) => (
                    <TableCell
                      key={product.id}
                      className={product.isBest ? 'bestProduct' : ''}
                    >
                      {product.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Model</TableCell>
                  {comparisonData?.map((product) => (
                    <TableCell key={product.id}>{product.model}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  {comparisonData?.map((product) => (
                    <TableCell key={product.id}>{product.brand}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Release Year</TableCell>
                  {comparisonData?.map((product) => (
                    <TableCell key={product.id}>{product.releaseYear}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Features</TableCell>
                  {comparisonData?.map((product) => (

                    <TableCell key={product.id}>
                      <ul>
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth maxWidth="md">
          {selectedProduct && (
            <EditProduct
              product={selectedProduct}
              onSave={handleSaveProduct}
              onCancel={handleEditDialogClose}
            />
          )}
      </Dialog>
      <Dialog open={viewDialogOpen} onClose={handleViewDialogClose} fullWidth maxWidth="md">
        <DialogTitle>View Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <div>
              <Typography variant="h5">{selectedProduct.name}</Typography>
              <Typography variant="body1">Model: {selectedProduct.model}</Typography>
              <Typography variant="body1">Brand: {selectedProduct.brand}</Typography>
              <Typography variant="body1">Release Year: {selectedProduct.releaseYear}</Typography>
              <Typography variant="body1">Category: {selectedProduct.category}</Typography>
              <Typography variant="body1">Features:</Typography>
              <ul>
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Product;
