//console.log('está funcionando!');
let productsFront = document.getElementById("productsFront");


const socket = io();
socket.on('products', (products)=>{
    console.log(products);
    printProducts(products)
})


function printProducts(products) {
    products.forEach(product => {
        document.body.append(product.id);
        document.body.append(product.title);
        document.body.append(product.description);
        document.body.append(product.code);
        document.body.append(product.price);
        document.body.append(product.status);
        document.body.append(product.stock);
        document.body.append(product.category);
        document.body.append(product.thumbnail);
    });
}