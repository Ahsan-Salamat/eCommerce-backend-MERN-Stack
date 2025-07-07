import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: Number, required: true },
      zipCode: { type: Number, required: true },
      country: { type: String, required: true },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    paymentMethods: {
      type: String,
      required: [true, "Please select payment method"],
      enum: {
        values: ["COD", "Card"],
        message: "Please select COD or Card",
      },
    },

    paymentInfo: {
      id: { type: String }, // If you're using Stripe, PayPal etc., `id` should be a string
    },

    totalItemsPrice: {
      type: Number,
      required: true,
    },

    taxAmount: {
      type: Number,
      required: true,
    },

    shippingCost: {
      type: Number,
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    orderstatus: {
      type: String,
      enum: {
        values: ["Processing", "Shipped", "Delivered"],
        message: "Please select correct order status",
      },
      default: "Processing",
    },

    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
