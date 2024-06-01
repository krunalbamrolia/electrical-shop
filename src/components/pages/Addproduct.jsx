import React, { useState, useEffect } from 'react';
import {
    Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddProduct = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [features, setFeatures] = useState(['']);  

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('http://localhost:3010/models');
                if (response.data) {
                    setModels(response.data);
                } else {
                    console.error('No models data found in the response:');
                }
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchModels();
    }, []);

    useEffect(() => {
        if (selectedModel) {
            const selectedModelDetails = models.find(model => model.model === selectedModel);
            if (selectedModelDetails) {
                setBrand(selectedModelDetails.brand);
                setCategory(selectedModelDetails.category);
            } else {
                setBrand('');
                setCategory('');
            }
        } else {
            setBrand('');
            setCategory('');
        }
    }, [selectedModel, models]);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setSelectedModel('');
        setName('');
        setPrice('');
        setBrand('');
        setCategory('');
        setReleaseYear('');
        setFeatures(['']); // Reset features to include only the default input field
    };

    const handleAddProduct = async () => {
        const newProduct = {
            name,
            price: parseFloat(price),
            model: selectedModel,
            brand,
            category,
            releaseYear: parseInt(releaseYear, 10),
            features: features.filter(feature => feature.trim() !== ''), // Remove empty features
        };

        try {
            await axios.post('http://localhost:3010/products', newProduct);
            setDialogOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product added successfully',
            });
            resetForm();
        } catch (error) {
            console.error('Error adding product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error adding product',
            });
        }
    };

    const handleAddFeatureField = () => {
        setFeatures([...features, '']); // Add a new empty string to the features array
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    return (
        <Container>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Add Product
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Select Model"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        {models.map((model) => (
                            <MenuItem key={model.id} value={model.model}>
                                {model.model}
                            </MenuItem>
                        ))}
                    </TextField>


                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />
                    <TextField
                        label="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        disabled
                    />
                    <TextField
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        disabled
                    />
                    <TextField
                        label="Release Year"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />
                    {features.map((feature, index) => (
                        <TextField
                            key={index}
                            label={`Feature ${index + 1}`}
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    ))}
                    <Button onClick={handleAddFeatureField} color="primary" variant="outlined">
                        Add Another Feature
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProduct} color="primary" variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AddProduct;
