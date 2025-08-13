import { Request, Response } from "express";
import { Cart, Product } from "../types/types";
import productsJSON from "../data/productos.json";

// This array content different carts
const cart: Cart = {id: 0, products: []};

export const getCart = (req: Request, res: Response) => {
  const lengthParam = req.query.length;

  if(lengthParam === "true") {
    res.status(200).json({ length: cart.products.length });
    return;
  }

  res.status(200).json({ cart });
};

export const addProductToCart = (req: Request, res: Response) => {
  // error to found body data
  if(!req.body) {
    res.status(400).json({ ok: false, message: "Product ID is required" });
    return;
  }

  const productId = req.body.productId;

  if (!productId) {
    res.status(400).json({ ok: false, message: "Product ID is required" });
    return;
  }

  const products: Product[] = productsJSON;

  // search product by id
  const product: Product | undefined = products.find(
    (product) => product.id === productId
  );

  if (!product) {
    res.status(404).json({ ok: false, message: "Product not found" });
    return;
  }
  
  // verify is product is already in the cart
  const productIsInCart = cart.products.find(productCart => productCart.id === productId);

  // if product isn't in the cart, add it
  if (!productIsInCart) {
    cart.products.push(product);
  } 
  
  res.status(200).json({ok: true, message: 'Product added to the cart'})
};
