import fs from "fs";

class CartsManager {
    constructor() {
        this.carts = [];
    };

    addCart() {
        const newCart = {
            ID: this.#getMaxID() + 1,
            products: []
        };
        if (fs.existsSync('./db/Carts.json')) {
            this.#readCarts();
            this.carts.push(newCart);
        } else { 
            this.carts.push(newCart);
        }
        fs.writeFileSync('./db/Carts.json', JSON.stringify(this.carts));
    }

    addProduct(cartID, product) {
        //const productID = product.ID;
        //console.log(productID)

        if (!this.#findCart(cartID)) {
            console.log('Cart not found')
        } else if (this.#findProduct( cartID, product )) {
            console.log('Product already exists');
            this.#updateProductQty(cartID, product);
        } else {
            this.#updateCartProducts(cartID, product);
        };
        fs.writeFileSync('./db/Carts.json', JSON.stringify(this.carts));
    }


    getCarts() {
        // console.log(this.carts);
        // return this.carts;
        if (fs.existsSync('./db/Carts.json')) {
            this.#readCarts()
            //console.log(this.carts);
            return this.carts;
        } else {
            console.log(this.carts);
            return this.carts;
        };
    };

    getCartByID(ID) {
        console.log(this.#findCart(ID));
        return this.#findCart(ID);
    };

    getProductByID(cartID, productID){
        const product = this.#findProduct(cartID, productID);
        console.log(product);
    }

    #updateCartProducts(cartID, product) {
        let productUpdate = {};
        this.carts.forEach((cart) => {
            if (cart.ID === cartID) {
                 productUpdate = {
                     qty: 1,
                     ID: product
                 }
                return cart.products.push(productUpdate);
            };
        });
    };

    #updateProductQty(cartID, productID) {
        let index = false;
        let cartFound = this.#findCart(cartID);       
        cartFound.products.forEach((product) => {
            if (product.ID === productID) {
                index = cartFound.products.indexOf(product);
            }
        });
        cartFound.products[index].qty += 1;                                        
    };


    #findCart(ID) {
        let cartFound = false;
        this.carts.forEach((cart) => {            
            if (cart.ID === ID) {                
                cartFound = cart;
            };
        });
        return cartFound;
    };

    #findProduct(cartID, productID) {
        let cartFound = this.#findCart(cartID);
        const IDFound = cartFound.products.find(product => product.ID === productID);
        return IDFound;
    };

    #getMaxID() {
        let maxID = 0;
        this.carts.map((cart) => {
            if (cart.ID > maxID) maxID = cart.ID;
        });
        return maxID;
    };
    #readCarts() {
        const carts = JSON.parse(fs.readFileSync('./db/Carts.json', 'utf-8'));
        this.carts = carts;
    };
};

const cartManager = new CartsManager();

//cartManager.getCarts();
//cartManager.addCart();
//cartManager.getCarts();
// cartManager.addCart();
// cartManager.getCarts();
// cartManager.addProduct(1, { ID: 42 });
// cartManager.addProduct(1, { ID: 52 });
// cartManager.addProduct(1, { ID: 62 });
//cartManager.addProduct(1, { ID: 62 });
//
// cartManager.getCarts();
// cartManager.addProduct(1, { ID: 52 });
// cartManager.addProduct(1, { ID: 42 });
// cartManager.getCarts();
// cartManager.getProductByID(1, 42);
// cartManager.getProductByID(1, 52);
// cartManager.getProductByID(1, 62);
//console.clear()
// cartManager.addProduct(1, { ID: 42 });
// cartManager.getProductByID(1, 42);
// cartManager.getProductByID(1, 52);
// cartManager.getProductByID(1, 62);

export { cartManager };
