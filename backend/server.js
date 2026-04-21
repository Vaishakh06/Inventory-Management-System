const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)

    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Product Schema
const productSchema = new mongoose.Schema({
    product_id: String,
    name: String,
    quantity: Number,
    threshold: Number
});

const Product = mongoose.model('Product', productSchema);

// Add new or existing product stock
app.post('/add-stock', async (req, res) => {
    const { product_id, name, quantity, threshold } = req.body;
    const product = await Product.findOne({ product_id });

    if (product) {
        product.quantity += quantity;
        await product.save();
        return res.json({ message: 'Stock updated', product });
    }

    const newProduct = new Product({ product_id, name, quantity, threshold });
    await newProduct.save();
    res.json({ message: 'New product added', product: newProduct });
});

// Reduce stock
app.post('/reduce-stock', async (req, res) => {
    const { product_id, quantity } = req.body;
    const product = await Product.findOne({ product_id });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.quantity < quantity) return res.status(400).json({ error: 'Not enough stock' });

    product.quantity -= quantity;
    await product.save();
    res.json({ message: 'Stock reduced', product });
});

// Delete a product completely
app.post('/delete-stock', async (req, res) => {
    const { product_id } = req.body;

    try {
        const result = await Product.deleteOne({ product_id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.json({ message: "Product deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Server error." });
    }
});


// Get all products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get low stock report
app.get('/low-stock', async (req, res) => {
    const lowStockProducts = await Product.find({ $expr: { $lt: ["$quantity", "$threshold"] } });
    res.json(lowStockProducts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
