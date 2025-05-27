import Product from "../models/Products"

//create new Product => /api/v1/products
export const getProducts = (req , res) => {
    res.status(200).json({
        message: "ALl Products",
    });
}


//create new Product => /api/v1/admin/products
export const newProducts = async (req , res) => {
    const product = await Product.create() 
}