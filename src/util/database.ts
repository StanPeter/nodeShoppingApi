import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "test", "test", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
