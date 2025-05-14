import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OrderService } from './order.service';
import AppError from '../../errors/AppErrors';
import config from '../../config/index';

const createOrder = catchAsync(async (req, res) => { 
// console.log("strtg",req.body);
  const result = await OrderService.createOrderIntoDB(req.body);

  // console.log({result});
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created succesfully',
    data: result, 
  });
});

const successOrder = catchAsync(async (req, res)=> {
  const { transactionId } = req.params;
  const result = await OrderService.successOrderIntoDB(transactionId)

  
  if( result.modifiedCount === 0 ){
    throw new AppError(httpStatus.BAD_REQUEST, 'Order was not updated');
  }
return res.redirect(`${config.frontendBaseUrl}/successfull-order`)
})
// fail order
const failOrder = catchAsync(async (req, res)=> {
  const { transactionId } = req.params;
  const result = await OrderService.failOrderIntoDB(transactionId)
  
  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete order');
  }
  return res.redirect(`${config.frontendBaseUrl}/failed-order`)
})


const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrdersFromDB(req.query);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Got All Order succesfully',
    data: result,
  });
});

const updateSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const fddd = req.body
// console.log({id, fddd});
  const result = await OrderService.updateOrderIntoDB(id, req.body);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Updated succesfully',
    data: result,
  }); 
});

const deleteSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrderFromDB(id);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Deleted succesfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrder,
  updateSingleOrder,
  deleteSingleOrder,
  successOrder,
  failOrder,
};
