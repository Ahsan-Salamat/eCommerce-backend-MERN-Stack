import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/Products.js";
import ApiFilter from "../utils/ApiFilter.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getProducts = catchAsyncError(async (req, res) => {
  const limitPerPageProd = 4;

  const apiFilter = new ApiFilter(Product.find(), req.query)
    .search()
    .filter()
    .pagination(limitPerPageProd);

  const products = await apiFilter.query;

  res.status(200).json({
    success: true,
    products,
  });
});

//api/admin/products
export const newProducts = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id; // Assuming req.user is set by the authentication middleware

  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

export const getProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    product,
  });
});

export const updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product has been deleted",
  });
});

//create/update product reviews -> api/v1/reviews
export const createUpdateReviews = catchAsyncError(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    comment,
    rating: Number(rating),
  };

  const product = await Product.findById(productId);

   if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Check if user has already reviewed the product
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update existing review
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.comment = comment;
        r.rating = rating;
      }
    });
  } else {
    // Add new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate average rating
  const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  product.ratings = totalRating / product.reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
    message: isReviewed ? "Review updated" : "Review added",
  });
});


//Get all reviews of particular product -> api/v1/review
export const getAllReview = catchAsyncError(async(req,res,next)=>{

  // const productId = req.query.id;
  const product = await Product.findById(req.query.id)
   if (!product) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  const productName = product.name
  const reviews = product.reviews

  res.status(200).json({
    success:true,
    productName,
    reviews
  })
})

//delete reviews product reviews -> api/v1/reviews
export const deleteReviews = catchAsyncError(async (req, res) => {
  
  const product = await Product.findById(req?.query?.productId)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }



 product.reviews = product.reviews.filter(
    (review) => review._id.toString() !== req?.query?.id.toString()
  );

  product.numOfReviews = product?.reviews?.length

  // Calculate average rating
  const aveRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  product.ratings = product.numOfReviews === 0 ? 0 : aveRating / product.numOfReviews;

  await product.save();

  res.status(200).json({
    success: true,
    product
  });
});