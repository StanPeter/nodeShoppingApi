import express from "express";
import bodyParser from "body-parser";
import sequelize from "util/database";
import path from "path";
//routes
import adminRoutes from "routes/admin";
import shopRoutes from "routes/shop";
import errorController from "controllers/error";

const app = express();

//engine is in ejs || pug || mustache
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//looks at requests where the Content-Type: application/json header is present and transforms the text-based JSON input into JS-accessible variables under req.body
app.use(bodyParser.urlencoded({ extended: true })); //extended: true precises that the req.body object will contain values of any type instead of just strings.

//routes
app.use("/admin", adminRoutes); //with pre-index /admin
app.use(shopRoutes);
app.use(errorController);

sequelize
    .sync({ force: true }) //overwrites all the tables in DB (so turn off in production!)
    .then((_result: any) => {
        app.listen(3000);
    })
    .catch((e: string) => console.log(e, "error"));
