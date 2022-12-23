import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";

const router = Router();
const products = productManager.getProducts();
//console.log(products);

router.get("/", (req, res) => {
  res.render('home', {
    products
  });
});

export default router;