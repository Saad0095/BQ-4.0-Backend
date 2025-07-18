const express = require('express')
require('./db/index')

const Product = require('./models/product')
const Order = require('./models/order')
const app = express()
app.use(express.json())

// Prodcuts Get and Post

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.msg })
    }
})

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})

// Order
app.post('/order', async (req, res) => {
    try {
        const order = await Order.create(req.body)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ error: error.msg })
    }
})

app.listen(3199, () => {
    console.log("Server running");
})