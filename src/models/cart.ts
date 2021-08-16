import Sequelize, { Model } from "sequelize";
import sequelizeConnection from "util/database";

//parameters are visible in auto-completing
interface cartAttributes {
    id: number;
    amount: number
}

export default class cartInstance extends Model<cartAttributes> {}

cartInstance.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        amount: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "carts",
    }
);
