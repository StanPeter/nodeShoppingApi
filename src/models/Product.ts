import Sequelize, { Model } from "sequelize";
import sequelizeConnection from "util/database";

//parameters are visible in auto-completing
export interface ProductAttributes {
    id?: number;
    title: String;
    price: number | String;
    imageUrl?: String;
    description?: String;
}

export default class Product extends Model<ProductAttributes> {
    // access fields by User.userName
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public title!: String;
    public price!: number;
    public imageUrl!: String;
    public description!: String;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init(
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
        tableName: "Products",
    }
);
