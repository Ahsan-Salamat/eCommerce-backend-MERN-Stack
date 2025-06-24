import catchAsyncError from '../middlewares/catchAsyncError.js';
import Product from '../models/Products.js'
import ApiFilter from '../utils/ApiFilter.js';
import ErrorHandler from '../utils/errorHandler.js'
//api/products


export const getProducts = catchAsyncError( async(req,res)=>{

    const apifilter = new ApiFilter(Product, req.query).search()

    let products = await apifilter.query;

    res.status(200).json({
        products,
    })
});

//api/admin/products
export const newProducts = catchAsyncError(async (req, res) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        product,
    })
});


export const getProductDetail = catchAsyncError (async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product) {
       return next(new ErrorHandler("Product not found", 404));

    }

    res.status(200).json({
        product,
    })
})


export const updateProduct = catchAsyncError(async (req, res) => {
    let product = await Product.findById(req.params.id)

    if(!product) {
        return res.status(404).json({
            error: "Product not found",
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body , { new: true })

    res.status(200).json({
        product,
    })
});

export const deleteProduct = catchAsyncError(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        return res.status(404).json({
            error: "Product not found",
        });
    }

    await product.deleteOne();

    res.status(200).json({
       message: "Product has been deleted"
    })
});
