import { NextFunction, Request, Response } from "express";

import Product from "models/product";
const Cart = require("../models/cart");

export const getProducts = async (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const products = await Product.findAll();

    res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
    });
};

export const getProduct = (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then((product: any) => {
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products",
            });
        })
        .catch((err: string) => console.log(err));
};

export const getIndex = async (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const products = await Product.findAll();

    res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
    });
};

export const getCart = async (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const products = await Product.findAll();

    Cart.getCart((cart: any) => {
        const cartProducts: any = [];
        products.forEach((product: any) => {
            const cartProductData = cart.products.find(
                (prod: any) => prod.id === product.id
            );

            if (cartProductData) {
                cartProducts.push({
                    productData: product,
                    qty: cartProductData.qty,
                });
            }
        });

        res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: cartProducts,
        });
    });
};

export const postCart = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const product = await Product.findByPk(req.body.productId);

    if (!product) throw new Error("No product was found");

    //@ts-ignore
    Cart.addProduct(req.body.productId, product.price);

    res.redirect("/cart");
};

export const postCartDeleteProduct = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const product = await Product.findByPk(req.body.productId);

    if (!product) throw new Error("No product was found");

    //@ts-ignore
    Cart.deleteProduct(prodId, product.price);

    res.redirect("/cart");
};

export const getOrders = (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
    });
};

export const getCheckout = (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};
