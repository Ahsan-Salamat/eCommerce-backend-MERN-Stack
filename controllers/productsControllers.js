import Product from '../models/Products.js'
//api/prodcuts
export const getProducts = async (req,res)=>{
    res.status(200).json({
        message: "All Products",
    })
}

//api/admin/products
export const newProducts = async (req,res)=>{
    const product = await Product.create(req.body)

    res.status(200).json({
        product,
    })
}
