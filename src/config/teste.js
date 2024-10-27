
/*
//config/teste.js
import User from "./dbUser.js";
import Category from "./dbCategory.js";
import Product from "./dbProduct.js";
import ImgProduct from "./dbImgProduct.js";
import ProductOption from "./dbOptionProduct.js";
import CategoryProduct from "./dbCategoryProduct.js";

User.hasMany(Product, { foreignKey: "user_id" });
Product.belongsTo(User, { foreignKey: "user_id" });

Category.belongsToMany(Product, {
  through: CategoryProduct,
  foreignKey: "category_id"
});
Product.belongsToMany(Category, {
  through: CategoryProduct,
  foreignKey: "product_id"
});

Product.hasMany(ImgProduct, { foreignKey: "product_id" });
ImgProduct.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(ProductOption, { foreignKey: "product_id" });
ProductOption.belongsTo(Product, { foreignKey: "product_id" });

export { User, Category, Product, ImgProduct, ProductOption, CategoryProduct };
*/