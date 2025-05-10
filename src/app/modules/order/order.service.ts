import { UserServices } from '../user/user.service';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import SSLCommerzPayment from 'sslcommerz-lts';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status'


const ssl = {
  STORE_ID: 'erger67f7cdd256d33',
  STORE_PASS: 'erger67f7cdd256d33@ssl',
  is_live: false
}

const createOrderIntoDB = async (payload: TOrder) => {
  const user_id = payload.user.toString()
  const DBuser = await UserServices.getSingleUser(user_id)
  const transactionId = `${uuidv4()}-${Date.now()}`
  // console.log({ payload, DBuser, transactionId });


  const data = {
    total_amount: payload.totalPrice,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `${process.env.API_BASE_URL}/api/orders/success/${transactionId}`,
    fail_url: `${process.env.API_BASE_URL}/api/orders/fail/${transactionId}`,
    cancel_url: `${process.env.API_BASE_URL}/api/orders/cancel/${transactionId}`,
    shipping_method: 'NO',
    product_name: 'Bicycle',
    product_category: 'Physical Goods',
    product_profile: 'general',
    cus_name: DBuser?.name,
    cus_email: DBuser?.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Bangladesh',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Bangladesh',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000',
    ship_country: 'Bangladesh',
    value_a: 'ref001',
    value_b: 'ref002',
    value_c: 'ref003',
    value_d: 'ref004'
  };




  const sslcz = new SSLCommerzPayment(
    ssl.STORE_ID,
    ssl.STORE_PASS,
    ssl.is_live
  )


  const apiResponse = await sslcz.init(data)
  const GatewayPageURL = apiResponse.GatewayPageURL

  const orderData = { ...payload, transactionId }

  
  // console.log({orderData,  GatewayPageURL});
  const createOrder = await Order.create(orderData);
  // console.log("success");

  return {
    GatewayPageURL,
    order: createOrder
  }



};

const successOrderIntoDB = async (transactionId: string) => {
  // Find the order with the given transactionId
  const order = await Order.findOne({ transactionId });

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'No order found with this transaction ID');
  }

  // Update the order status to processing and payment status to paid
  const updatedRwsult = await Order.updateOne(
    { transactionId },
    {
      shippinhStatus: 'PROCESSING',
      paymentStatus: 'PAID'
    },
    { new: true }
  )

  if (updatedRwsult.modifiedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order was not updated');
  }


  return updatedRwsult;
}

const failOrderIntoDB = async (transactionId: string) => {
  // delete the order with the given transactionId
  const deleteOrder = await Order.deleteOne({ transactionId });


  if (deleteOrder.deletedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete order');
  }


  return deleteOrder;
}




const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  let page = Number(query.page) || 1; // Default to page 1 if not provided
  let limit = Number(query.limit) || 10; // Default to 10 items per page if not provided
  const skip = (page - 1) * limit;

  const result = await Order.find()
    .populate('user')
    .populate('products.product')
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments();
  return {
    data: result,
    totalOrders,
    totalPages: Math.ceil(totalOrders / limit),
    currentPage: page,
  };
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const status = payload.shippinhStatus;
  const result = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const OrderService = {
  getAllOrdersFromDB,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
  successOrderIntoDB,
  failOrderIntoDB,
};
