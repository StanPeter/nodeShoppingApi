import express, { Application } from "express";
import sequelizeConnection from "util/database";
import path from "path";
import dotenv from "dotenv";
//routes
import adminRoutes from "routes/admin";
import shopRoutes from "routes/shop";
import errorController from "controllers/error";
//mockData
import products from "data/products.json";
import users from "data/users.json";
//models
import Product from "models/product";
import CartItem from "models/cartItem";
import Cart from "models/cart";
import User from "models/user";
import Order from "models/order";
import OrderItem from "models/orderItem";

//load enviroment variables
dotenv.config();

//constants
const app: Application = express();
const port = process.env.PORT ?? 3000;

//engine is in ejs || pug || mustache
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
//transfer POST/PUT data to the correct format
app.use(express.urlencoded({ extended: true })); //extended: true precises that the req.body object will contain values of any type instead of just strings.

//routes
app.use("/admin", adminRoutes); //with pre-index /admin
app.use(shopRoutes);
app.use(errorController);

// relations
//product should have userId column
Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
});
User.hasMany(Product, { foreignKey: "userId" });

//cart should have userId column as it belongs to User
Cart.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
});
User.hasOne(Cart, { foreignKey: "userId" });

//joins
Product.belongsToMany(Cart, { through: CartItem, foreignKey: "productId" });
Cart.belongsToMany(Product, { through: CartItem, foreignKey: "cartId" });

//orders
Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId" });
Product.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: "productId",
});

//self calling method to run server
(async () => {
    try {
        await sequelizeConnection.sync({ force: true });

        users.forEach((user) => User.create(user));
        products.forEach((product) => Product.create(product));

        app.listen(port, () => console.log("Listening on " + port));
    } catch (e) {
        throw new Error(e);
    }
})();
