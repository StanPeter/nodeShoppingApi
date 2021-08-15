import express, { Application } from "express";
import sequelize from "util/database";
import path from "path";
import dotenv from "dotenv";
//routes
import adminRoutes from "routes/admin";
import shopRoutes from "routes/shop";
import errorController from "controllers/error";
//mockData
import products from "data/products.json";
//models
import Product from "models/product";

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

//self calling method to run server
(async () => {
    try {
        await sequelize.sync({ force: true });

        products.forEach((product) => Product.create(product));

        app.listen(port, () => console.log("Listening on " + port));
    } catch (e) {
        throw new Error(e);
    }
})();
