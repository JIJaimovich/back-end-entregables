import express from 'express';
import { productsRouter } from './routers/products.router.js';
//import exportProducts from './ProductManager.js';
import { cartsRouter } from './routers/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use( '/api/products', productsRouter );
app.use( '/api/carts', cartsRouter );

const PORT = 8080;
//const products = exportProducts;

app.listen(PORT, () => {
    console.log(`🎈 Listening on port ${PORT}`);
}); 