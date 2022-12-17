import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct( title, description, code, price, status=true, stock, category, thumbnail ) {
            const newProduct = {
                id: this.#getMaxId() + 1,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail              
            };
            const productsValues = Object.values(newProduct);
            const productCode = this.#getProductCode(newProduct.code);
            if (productsValues.includes(undefined)) {       
                console.error('Empty field');
            } else if (productCode) {     
                console.error('The product already exists');
            } else {
                if (fs.existsSync('./db/Products.json')) {
                    this.#readProducts();
                    this.products.push(newProduct);
                } else { 
                    this.products.push(newProduct);
                }
                fs.writeFileSync('./db/Products.json', JSON.stringify(this.products));
            }
    }

    getProducts() {
        if (fs.existsSync('./db/Products.json')) {
            this.#readProducts()
            //console.log(this.products);
            return this.products;
        } else {
            //console.log(this.products);
            return this.products;
        };
    }

    getProductById(id) {
        let productFound = false;
        this.products.forEach((product) => {
            if (product.id === id) {
                productFound = product;
            }
        })
        //productFound ? console.log('This is the product: ', productFound) : console.log("Not found");
        return productFound;
    }

    updateProduct( id, newTitle, newDescription, newCode, newPrice, newStatus, newStock, newCategory, newThumbnail ){
        this.products.forEach((product) => {
            if (product.id === id) {
                product.title = newTitle;
                product.description = newDescription;
                product.code = newCode;
                product.price = newPrice;
                product.status = newStatus;
                product.stock = newStock;
                product.newCategory = newCategory;
                product.thumbnail = newThumbnail;                
                //console.log(this.products);
                fs.writeFileSync('./db/Products.json', JSON.stringify(this.products))
            }
        })
    }

    deleteProduct(id){
        const getIndex = (element) => element.id === id;
        let search = this.products.findIndex(getIndex);
        if (search > -1) {
           this.products.splice(search, 1);
        } else {
            console.log('Fail to delete. Product not found-')
        }
        fs.writeFileSync('./db/Products.json', JSON.stringify(this.products));
    }


    #readProducts() {
        const products = JSON.parse(fs.readFileSync('./db/Products.json', 'utf-8'));
        this.products = products;
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }
    #getProductCode(codeProduct) {
        return this.products.find((product) => product.code === codeProduct);   
    }
}

const productManager = new ProductManager();

// productManager.getProducts();
// for (let index = 1; index <= 10; index++) {
//     productManager.addProduct(`producto prueba ${index}`, `Este es un producto prueba`, 200, `Sin imagen`, `abc12${index}`, 25);
// }

//const exportProducts = productManager.getProducts();
//Function otra() = productManager.addProduct();
//const otra = "hola";


export { productManager };