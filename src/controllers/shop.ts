import { NextFunction, Request, Response } from "express";

const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (
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

exports.getProduct = (req: Request, res: Response, _next: NextFunction) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product: any) => {
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products",
            });
        })
        .catch((err: string) => console.log(err));
};

exports.getIndex = async (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    const products = await Product.findAll();

    res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
    });
};

exports.getCart = async (_req: Request, res: Response, _next: NextFunction) => {
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

exports.postCart = (req: Request, res: Response, _next: NextFunction) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product: any) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect("/cart");
};

exports.postCartDeleteProduct = (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product: any) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
    });
};

exports.getOrders = (_req: Request, res: Response, _next: NextFunction) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
    });
};

exports.getCheckout = (_req: Request, res: Response, _next: NextFunction) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};
