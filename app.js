import express from 'express';
import exportProducts from './ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
const products = exportProducts;

app.get('/products', (req, res) => {
    const { limit } = req.query;
    if (!limit) return res.json(products);
    const productsLimited = [];
    for (let index = 0; index < limit; index++) {
        productsLimited.push(products[index])
    };
    res.json(productsLimited);
})

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;    
    let product = products.find(prod => prod.id == pid);
    if (!product) {
        res.json({ title: 'error', description: 'id not found' })
    } else {
        res.json(product)
    }; 
})


app.listen(PORT, () => {
    console.log(`🎈 Listening on port ${PORT}`);
}); 