import { NextFunction, Request, Response } from "express";
//models
import Product, { ProductAttributes } from "models/product";
import Cart, { cartAttributes } from "models/cart";
import User from "models/user";

interface GetCartInterface extends cartAttributes, ProductAttributes {}

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

export const getCart = async (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    //normally would come from req.user for example
    const cart = await Cart.findAll({ where: { userId: 1 } });
    let dataOut: Array<GetCartInterface> = [];

    cart.forEach(async (item) => {
        const foundProduct = await Product.findByPk(
            item.getDataValue("productId")
        );

        const cartValues = item.get();
        const productValues = foundProduct!.get();

        dataOut.push({ ...cartValues, ...productValues });
    });

    res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: dataOut,
    });
};

export const postCart = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    try {
        await Cart.create({
            amount: 1,
            userId: 1,
            productId: 1,
        });
    } catch (e) {
        console.log(e, "error");
    }

    res.redirect("/cart");
};

export const postCartDeleteProduct = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const product = await Product.findByPk(req.body.productId);

    if (!product) throw new Error("No product was found");

    // Cart.deleteProduct(req.body.productId, product._attributes.price);

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
