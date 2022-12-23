
import express from 'express';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import realTimeProductsRouter from './routers/realTimeProducts.router.js';
import { Server } from "socket.io";
import { productManager } from './managers/ProductManager.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static
app.use(express.static('public'));

//config handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');


app.use('/', viewsRouter);
app.use('/realtimeproducts', realTimeProductsRouter);

app.use( '/api/carts', cartsRouter );
app.use('/api/products', productsRouter);


const PORT = 8080;
//const products = exportProducts;

const server = app.listen(PORT, () => {
    console.log(`🎈 Listening on port ${PORT}`);
}); 

const socketServer = new Server(server);

const productsRealTime = productManager.getProducts();

socketServer.on('connection', (socket)=>{
    console.log('New connection');
    socket.emit('products', productsRealTime);
});