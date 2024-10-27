import { DataTypes, Model } from "sequelize";
import { connectDB } from "./database.js";

const sequelize = connectDB();

class CategoryProduct extends Model {}

CategoryProduct.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id"
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "CategoryProduct",
    timestamps: false
  }
);

export default CategoryProduct ;
