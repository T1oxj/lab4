const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const productsFilePath = path.join(__dirname, 'products.json');

function readProductsFile() {
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
}

function writeProductsFile(data) {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/products', (req, res) => {
    debugger
    const products = readProductsFile();
    res.json(products);
});

app.post('/products', (req, res) => {
    const products = readProductsFile();
    const newId = `id${Date.now()}`;
    products[newId] = req.body;
    writeProductsFile(products);
    res.status(201).json({ id: newId });
});

app.delete('/products/:id', (req, res) => {
    const products = readProductsFile();
    const productId = req.params.id;
    if (products[productId]) {
        delete products[productId];
        writeProductsFile(products);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
