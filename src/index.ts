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
import Product from "models/Product";
import Cart from "models/Cart";
import User from "models/User";
import Order from "models/Order";

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
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

//self calling method to run server
(async () => {
    try {
        await sequelizeConnection.sync({ force: true });

        users.forEach((user) => User.create(user));
        products.forEach((product) => Product.create(product));

        Cart.create({
            amount: 1,
            userId: 1,
            productId: 1,
        });

        Cart.create({
            amount: 2,
            userId: 1,
            productId: 3,
        });

        Order.create({
            amount: 2,
            productId: 1,
            userId: 1,
            orderId: 1,
        });

        Order.create({
            amount: 3,
            productId: 3,
            userId: 1,
            orderId: 1,
        });

        Order.create({
            amount: 1,
            productId: 2,
            userId: 1,
            orderId: 2,
        });

        app.listen(port, () => console.log("Listening on " + port));
    } catch (e) {
        throw new Error(e);
    }
})();
