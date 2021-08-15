import Sequelize, { Model } from "sequelize";
import sequelizeConnection from "util/database";

//parameters are visible in auto-completing
interface ProductAttributes {
    id?: number;
    title: string;
    price: number | string;
    imageUrl?: string;
    description?: string;
}

export default class ProductInstance extends Model<ProductAttributes> {}

ProductInstance.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "products",
    }
);
