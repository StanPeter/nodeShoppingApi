import { NextFunction, Request, Response } from "express";
//models
import Product from "models/Product";
import Cart from "models/Cart";
import User from "models/User";

interface GetCardResponse {
    amount: number;
    title: String;
    id?: number;
}

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
    try {
        const user = await User.findByPk(1);
        if (!user) throw new Error("No user was found");

        let response: Array<GetCardResponse> = [];

        const carts = await user.getCarts();

        for (const cart of carts) {
            const foundProduct = await Product.findByPk(cart.productId);

            console.log(cart.productId, cart.amount);
            console.log(cart.get());
            console.log(cart.toJSON());
            response.push({
                amount: cart.amount,
                title: foundProduct!.getDataValue("title"),
                id: foundProduct!.getDataValue("id"),
            });
        }

        res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: response,
        });
    } catch (e) {
        console.log(e, "error");
        throw new Error(e);
    }
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

    // res.redirect("/cart");
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
