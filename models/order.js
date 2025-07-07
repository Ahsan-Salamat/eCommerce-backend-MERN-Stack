import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shipinginfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  paymentMethods:{
    type:String,
    required:[true,"Please Select Payment Methods"],
    enum:{
        values:["COD,Card"],
        message:"Please Select COD or Card"
    }
  },
  paymentInfo:{
    Id:String,
    required:true
  },
  totalItemsPrice:{
    type:Number,
    required:true
  },
  taxAmount:{
    type:Number,
    required:true
  },
  ShippingCost:{
    type:Number,
    required:true
  },
  grandTotal:{
    type:Number,
    required:true
  },
  orderstatus:{
    type:String,
    enum:{
        value:["Processing","Shipped","Delivered"],
        message:"Please select correct Order Status"
    },
    defualt:"Processing"
  },
  DeliveredAt:Date.now()
},{timestamps: true});
