import Sequelize, { Model } from "sequelize";
import sequelizeConnection from "util/database";

//parameters are visible in auto-completing
interface cartItemAttributes {
    id: number;
}

export default class cartItemInstance extends Model<cartItemAttributes> {}

cartItemInstance.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "cartItems",
    }
);
