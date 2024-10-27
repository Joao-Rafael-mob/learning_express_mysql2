import  User from './dbUser.js';
import  Product from './dbProduct.js';
import  Category from './dbCategory.js';
import  CategoryProduct from './dbCategoryProduct.js';
import  ImgProduct from './dbImgProduct.js';
import  ProductOption from './dbOptionProduct.js';

async function synchronizeModels() {
  await User.sync({ force: true });
  await Product.sync({ force: true });
  await Category.sync({ force: true });
  await CategoryProduct.sync({ force: true });
  await ImgProduct.sync({ force: true });
  await ProductOption.sync({ force: true });

  console.log('Todos os modelos foram sincronizados com sucesso.');
}

synchronizeModels().catch(console.error);
