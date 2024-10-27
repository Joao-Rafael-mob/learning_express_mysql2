import { DataTypes, Model } from "sequelize";
import { connectDB } from "./database.js";

const sequelize = connectDB();

class ProductOption extends Model {}

ProductOption.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id"
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shape: {
      type: DataTypes.ENUM("square", "circle"),
      allowNull: true,
      defaultValue: "square"
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    type: {
      type: DataTypes.ENUM("text", "color"),
      allowNull: true,
      defaultValue: "text"
    },
    values: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "ProductOption",
    timestamps: true
  }
);

export default ProductOption ;
