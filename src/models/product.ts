import Sequelize from "sequelize";
import sequelize from "util/database";

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    image: { type: Sequelize.STRING, allowNull: false },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

export default Product;
