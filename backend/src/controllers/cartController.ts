import { Request, Response } from "express";
import { Cart, Product } from "../types/types";
import productsJSON from "../data/productos.json";

// This array content different carts
let carts: Cart[] = [{id: 0, products: []}];

export const getCart = (req: Request, res: Response) => {
  res.status(200).json({ cart: carts[0] });
};

export const addProductToCart = (req: Request, res: Response) => {
  // error to found body data
  if(!req.body) {
    res.status(400).json({ ok: false, message: "Product ID is required" });
    return;
  }

  const productId = req.body.productId;
  const cartId = req.body.cartId;

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

  //Extra: if a cart is especified
  if(cartId) {
    // Look through the carts to select the asked cart
    carts = carts.map( cart => {
      if(cart.id === cartId) { 
        const productIsInCart = cart.products.find(productCart => productCart.id === productId);

        if (!productIsInCart) {// if product isn't in the cart, add
          cart.products.push(product);
        } 
      }

      //todo: create a new cart with id
      
      return cart
    })
  
  // if we are working with just a demo cart
  } else { 
    // verify is product is already in the cart
    const productIsInCart = carts[0].products.find(productCart => productCart.id === productId);

    // if product isn't in the cart, add it
    if (!productIsInCart) {
      carts[0].products.push(product);
    } 
  }

  res.status(200).json({ok: true, message: 'Product added to the cart'})
};
