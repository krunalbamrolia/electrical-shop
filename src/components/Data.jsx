import React, { useEffect, useState, useCallback } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Data = ({ searchTerm, values }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3010/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.price >= values[0] && product.price <= values[1] &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [values, searchTerm, products]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleDialogClose = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="grid-container">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="item-container"
            onClick={() => handleCardClick(product)} 
          >
            <p>{product.brand}</p>
            <h2>{product.name}</h2>
            <p className='fw-bold'>Price: ${product.price}</p>
            <p>Model: {product.model}</p>
          </div>
        ))}

        {/* Popup Dialog for showing details */}
        <Dialog open={Boolean(selectedProduct)} onClose={handleDialogClose}>
          <DialogTitle>{selectedProduct?.name} Details</DialogTitle>
          <DialogContent>
            <Typography>Price: ${selectedProduct?.price}</Typography>
            <Typography>Model: {selectedProduct?.model}</Typography>
            <Typography>Brand: {selectedProduct?.brand}</Typography>
            <Typography>Category: {selectedProduct?.category}</Typography>
            <Typography>Release Year: {selectedProduct?.releaseYear}</Typography>
            <Typography>Features:</Typography>
            <ul>
              {selectedProduct?.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Data;
