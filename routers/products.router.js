import { Router } from 'express';
import { productManager } from '../managers/ProductManager.js';

const productsRouter = Router();
const products = productManager.getProducts();


productsRouter.get('/', (req, res) => {
    const { limit } = req.query;
    if (!limit) return res.json(products);
    const productsLimited = [];
    for (let index = 0; index < limit; index++) {
        productsLimited.push(products[index])
    };
    res.json(productsLimited);
});

productsRouter.get('/:pid', (req, res) => {
    const { pid } = req.params; 
    const productFound = productManager.getProductById(Number(pid));
    if (!productFound) {
        res.json({ title: 'Error', description: 'ID not found' })
    } else {
        res.json(productFound);
    };
});

productsRouter.post('/', (req, res) => {

    const { title, description, code, price, status, stock, category, thumbnail='Img' } = req.body;             
    productManager.addProduct( title, description, code, price, status, stock, category, thumbnail );
    res.status(200).json(req.body);
});

productsRouter.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
    productManager.updateProduct( Number(pid), title, description, code, price, status, stock, category, thumbnail );
    res.status(200).json(req.body);
});

productsRouter.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    productManager.deleteProduct( Number(pid) );
    res.status(200).json(products);
});

export { productsRouter };