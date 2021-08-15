import { Sequelize } from "sequelize";

//connection to the mysql DB
const sequelize = new Sequelize("test", "test", "test", {
    dialect: "mysql",
    host: "localhost",
});

export default sequelize;
