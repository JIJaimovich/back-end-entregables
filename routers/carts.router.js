import { Router } from 'express';
import { cartManager } from '../managers/CartsManager.js';

const cartsRouter = Router();
const carts = cartManager.getCarts();

cartsRouter.get('/', (req, res)=> {
    res.json(carts);
});

cartsRouter.post('/', (req, res) => {          
    cartManager.addCart();
    res.status(200).json('Cart added');
});


cartsRouter.post('/:cid/product/:pid', (req, res) => {          
    const { cid } = req.params;
    const { pid } = req.params;
    cartManager.addProduct( Number(cid), Number(pid) );  
    res.status(200).json('Product added');
});

export { cartsRouter };