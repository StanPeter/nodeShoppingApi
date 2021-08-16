import express from "express";

import {
    getCart,
    getCheckout,
    getOrders,
    getProduct,
    getProducts,
    postCart,
    postCartDeleteProduct,
} from "controllers/shop";

const router = express.Router();

router.get("/", getProducts);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.post("/cart-delete-item", postCartDeleteProduct);

router.get("/orders", getOrders);

// router.post('/create-order', shopController.postOrder);

router.get("/checkout", getCheckout);

export default router;
