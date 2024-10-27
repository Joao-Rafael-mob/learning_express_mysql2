import { DataTypes, Model } from "sequelize";
import { connectDB } from "./database.js";

const sequelize = connectDB();

class ImgProduct extends Model {}

ImgProduct.init(
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
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "ImgProduct",
    timestamps: true
  }
);

export default ImgProduct ;
