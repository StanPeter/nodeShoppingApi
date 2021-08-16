import Sequelize, { Model } from "sequelize";
import sequelizeConnection from "util/database";

//parameters are visible in auto-completing
interface orderItemAttributes {
    id: number;
}

export default class orderItemInstance extends Model<orderItemAttributes> {}

orderItemInstance.init(
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
        tableName: "orderItems",
    }
);
