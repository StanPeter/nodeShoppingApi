import Sequelize, { Model } from "sequelize";
import sequelizeConnection from "util/database";

//parameters are visible in auto-completing
interface orderAttributes {
    id: number;
    userId: number;
    productId: number;
    orderId: number;
    amount: number;
}

export default class orderInstance extends Model<orderAttributes> {}

orderInstance.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        productId: {
            type: Sequelize.INTEGER,
        },
        orderId: {
            type: Sequelize.INTEGER,
        },
        amount: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "orders",
    }
);
