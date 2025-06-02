import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    maxlenght: [200, "Product Name cannot Exceed 200 Characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product price"],
    maxlength: [5, "Product Price cannot exceed 5 digits"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  ratings: { type: Number, default: 0 },
  images: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  category: {
    type: String,
    required: [true, "Please Select Product Category"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please Select Appropriate Category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please Enter Product Seller"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},{timestamps: true});


export default mongoose.model("Product" , productSchema)
