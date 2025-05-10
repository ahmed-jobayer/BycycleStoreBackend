import { TProduct } from './product.interface';
import { Product } from './product.model';
import { productSearchableFields } from './product.constant';
import QueryBuilder from '../../builder/QueryBuilder'

const createABicycleIntoDB = async (productData: TProduct) => {

  const productExists = await Product.findOne({ _id: productData._id });
  if (productExists) {
    throw new Error('Product with this ID already exists!');
  };

  const result = await Product.create(productData);
  return result;
};

const updateABicycleFromDB = async (
  id: string,
  updatedProductData: Partial<{ price: number; quantity: number }>
) => {

  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  if (updatedProductData.price) {
    product.price = updatedProductData.price;
  }

  if (updatedProductData.quantity) {
    product.quantity = updatedProductData.quantity;
  }

  await product.save();

  return product;
};


const getAllBicyclesFromDB = async (query: Record<string, unknown>) => {

  // console.log(query);

  const productQuery = new QueryBuilder(
    Product.find(),
    query,
  )

    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQuery.countTotal();
  // const result2 = await Product.find()
  // console.log({result2});
  const result = await productQuery.modelQuery;
  // console.log("jhamela", { meta, result });
  return { meta, result };
};

const getASpecificBicycleFromDB = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new Error('Product not found!');
  }
  return result;
};


const deleteABicycleFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)

  if (!result) {
    throw new Error('Product not found!');
  }
  return result;
};



const updateProductInventory = async (productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }


  if (product.quantity < quantity) {
    throw new Error('Insufficient stock available');
  }
  product.quantity -= quantity;

  if (product.quantity === 0) {
    product.inStock = false;
  }


  await product.save();

  return product;
};


export const ProductServices = {
  createABicycleIntoDB,
  updateABicycleFromDB,
  getAllBicyclesFromDB,
  getASpecificBicycleFromDB,
  deleteABicycleFromDB,
  updateProductInventory,
};