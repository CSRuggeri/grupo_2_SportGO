const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/product.json');

const productController = {
  // Read - Show all products
  index: () => {
    const productsFilePath = path.join(__dirname, '../data/product.json');
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsData).products;
  },
  getProductById: (productId) => {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData).products;
    return products.find((product) => product.id == productId);
  },
  // Read - Show product details
 
  // Create - Method to store
  store: (req, res) => {
    console.log(req.body);
  
    // Retrieve existing products
    const jsonData = fs.readFileSync(productsFilePath, 'utf-8');
    const data = JSON.parse(jsonData);
  
    // Ensure products is an array
    if (!Array.isArray(data.products)) {
      console.error('Products is not an array:', data.products);
      return res.status(500).send('Internal Server Error');
    }
  
    // Extract product data from request body
    const { name, description, image, price, category, talle } = req.body;
  
    // Generate a unique ID for the new product
    const id = data.products.length + 1;
  
    // Create a new product object
    const newProduct = {
      id,
      name,
      description,
      image,
      link: `/detail/${id}`, // Assuming link is generated based on ID
      price,
      discount: '', // Add your logic for discount calculation
      category,
      size: talle, // Assuming talle represents size
    };
  
    // Add the new product to the array
    data.products.push(newProduct);
  
    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  
    // Redirect to the product detail page for the newly created product
    res.redirect(`/products/detail/${id}`);
  },

  // Update - Form to edit
  edit: (req, res) => {
    const { id } = req.params;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const product = products.find((p) => p.id === parseInt(id));
    res.render('products/edit-product-form', { product });
  },

  // Update - Method to update
  update: (req, res) => {
    const { id } = req.params;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const updatedProduct = req.body;

    // Find the index of the product to be updated
    const index = products.findIndex((p) => p.id === parseInt(id));

    // Update the product in the array
    products[index] = { id: parseInt(id), ...updatedProduct };

    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify({ products }, null, 2), 'utf-8');

    // Redirect to the product detail page after update
    res.redirect(`/products/detail/${id}`);
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const { id } = req.params;
    let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    // Filter out the product to be deleted
    products = products.filter((p) => p.id !== parseInt(id));

    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify({ products }, null, 2), 'utf-8');

    // Redirect to the home page or any other page after deletion
    res.redirect('/');
  },
};

module.exports = productController;