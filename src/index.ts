import express from "express";
import bodyParser from "body-parser";

const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");
// const errorController = require("./controllers/error");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.get("/works", (_req, res) => {
    console.log(res.statusCode, "afasfafsa");

    res.render("index");
});

// app.use(errorController.get404);

sequelize
    .sync({ force: true })
    .then((_result: any) => {
        app.listen(3000);
    })
    .catch((e: string) => console.log(e, "error"));
