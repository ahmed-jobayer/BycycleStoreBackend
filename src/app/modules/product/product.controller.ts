import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import updateProductSchema from './updateProduct.validation';
import { Product } from './product.model';
import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
//import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createABicycle = catchAsync(async (req, res) => {
  const { name, Img, brand, price, type, description, quantity, inStock } =
    req.body;
  const validatedData = productValidationSchema.parse({
    name,
    Img,
    brand, 
    price,
    type,
    description,
    quantity,
    inStock,
  });

  const newProduct = new Product(validatedData);
  const result = await newProduct.save();

  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle is created successfully',
    data: result,
  });
});

const getAllBicycles = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllBicyclesFromDB(req.query);
  sendResponse.sendDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle retrieved successfully',
    data: result,
  });
});

const getASpecificBicycle = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductServices.getASpecificBicycleFromDB(id);

  sendResponse.sendDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle retrieved successfully',
    data: result,
  });
});

const updateABicycle = catchAsync(async (req, res) => {
  const validated = updateProductSchema.parse(req);
  const { id } = validated.params;
  const { price, quantity } = validated.body;

  const updatedProduct = await ProductServices.updateABicycleFromDB(id, {
    price,
    quantity,
  });

  sendResponse.sendDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Updated Successfully',
    data: updatedProduct,
  });
});

const deleteABicycle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteABicycleFromDB(id);

  sendResponse.sendDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: {},
  });
});

export const ProductControllers = {
  createABicycle,
  getAllBicycles,
  getASpecificBicycle,
  updateABicycle,
  deleteABicycle,
};
