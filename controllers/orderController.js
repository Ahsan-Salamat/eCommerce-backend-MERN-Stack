import catchAsyncError from "../middlewares/catchAsyncError.js";
import Order from "../models/order.js";
import Product from "../models/products.js";
import ErrorHandler from "../utils/errorHandler.js";

//create new order -> api/v1/order/new
export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    totalItemsPrice,
    paymentMethods,
    paymentInfo,
    taxAmount,
    shippingCost,
    grandTotal,
    orderstatus,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    totalItemsPrice,
    paymentMethods,
    paymentInfo,
    taxAmount,
    shippingCost,
    grandTotal,
    orderstatus,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Single order Detail by ID -> api/v1/order/:_id
export const getOrderDetail = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params._id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found by this Id", 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get order Detail by User -> api/v1/order/:_id
export const myOrderDetail = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all ordersDetails by Admin -> api/v1/admin/orders
export const allOrdersDetail = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  const count = orders.length;

  res.status(200).json({
    success: true,
    count,
    orders,
  });
});

//Update Order Status by Admin -> api/v1/admin/updateOrder/:_id
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params._id);

  if (!order) {
    return next(new ErrorHandler("Order Not Found by this Id", 404));
  }

  if (order.orderstatus === "Delivered") {
    return next(new ErrorHandler("You already Delivered This Order", 400));
  }

order?.orderItems?.forEach(async(item)=>{
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("Product Not Found by this Id", 404));
    }

    product.stock -= item.quantity;
    await product.save();
  })

  order.orderstatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    message: `Order Status has been Changed: ${order.orderstatus}`,
  });
});
