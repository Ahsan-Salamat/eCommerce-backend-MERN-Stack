import catchAsyncError from "../middlewares/catchAsyncError.js";
import Order from "../models/order.js";
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
    const order = await Order.findById(req.params._id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order not found by this Id",400))
    }

    res.status(200).json({
        success: true,
        order
    })
})

//Get order Detail by User -> api/v1/order/:_id
export const myOrderDetail = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});

    if(!orders){
        return next(new ErrorHandler("Order not found by this Id",400))
    }

    res.status(200).json({
        success: true,
        orders,
    })
})
