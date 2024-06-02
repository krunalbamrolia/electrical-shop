import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Price = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:3010/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const classes = makeStyles({
    table: {
      minWidth: 650,
    },
    searchInput: {
      marginBottom: 20,
    },
    paginationButtons: {
      marginTop: 20,
    },
  })();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pricing Page
      </Typography>

      <TextField
        className={classes.searchInput}
        label="Search Product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow >
              <TableCell style={{fontWeight:'800'}}>Name</TableCell>
              <TableCell style={{fontWeight:'800'}}>Category</TableCell>
              <TableCell style={{fontWeight:'800'}}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button className={classes.paginationButtons} onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
      <Button className={classes.paginationButtons} onClick={() => handleChangePage(page + 1)} disabled={page * rowsPerPage >= filteredProducts.length}>Next</Button>
    </div>
  );
};

export default Price;




// 
//  ---- update price ----
// 
// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography, IconButton } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import EditIcon from '@mui/icons-material/Edit';
// import axios from 'axios';

// const Price = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(10);
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     fetch('http://localhost:3010/products')
//       .then(response => response.json())
//       .then(data => setProducts(data));
//   }, []);

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };

//   const classes = makeStyles({
//     table: {
//       minWidth: 650,
//     },
//     searchInput: {
//       marginBottom: 20,
//     },
//     paginationButtons: {
//       marginTop: 20,
//     },
//   })();

// const handleEditProduct = (productId, newPrice) => {
//   // Find the product by productId
//   const updatedProducts = products.map(product => {
//     if (product.id === productId) {
//       // Update only the price
//       return { ...product, price: newPrice };
//     }
//     return product;
//   });

//   // Update the products state with the modified product
//   setProducts(updatedProducts);

//   // Send a PUT request to update the price in the backend database
//   axios.put(`http://localhost:3010/products/${productId}`, { price: newPrice })
//     .then(response => {
//       // Handle successful response
//       console.log('Price updated successfully');
//     })
//     .catch(error => {
//       // Handle error
//       console.error('Error updating price:', error);
//     });
// };


//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Pricing Page
//       </Typography>

//       <TextField
//         className={classes.searchInput}
//         label="Search Product"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <TableContainer component={Paper}>
//         <Table className={classes.table}>
//           <TableHead>
//             <TableRow >
//               <TableCell style={{ fontWeight: '800' }}>Name</TableCell>
//               <TableCell style={{ fontWeight: '800' }}>Category</TableCell>
//               <TableCell style={{ fontWeight: '800' }}>Price</TableCell>
//               {role === 'admin' && (
//                 <TableCell style={{ fontWeight: '800' }}>Action</TableCell>
//               )}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(product => (
//               <TableRow key={product.id}>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>${product.price}</TableCell>
//                 {role === 'admin' && (
//                   <TableCell>
//                     <IconButton onClick={() => handleEditProduct(product)}>
//                       <EditIcon />
//                     </IconButton>
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Button className={classes.paginationButtons} onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
//       <Button className={classes.paginationButtons} onClick={() => handleChangePage(page + 1)} disabled={page * rowsPerPage >= filteredProducts.length}>Next</Button>
//     </div>
//   );
// };

// export default Price;
