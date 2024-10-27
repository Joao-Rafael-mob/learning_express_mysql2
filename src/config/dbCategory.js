import { connectDB } from "./database.js";
import { DataTypes, Model } from "sequelize";

const sequelize = connectDB();

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false,
    }
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: true,
  }
);

export default Category ;
