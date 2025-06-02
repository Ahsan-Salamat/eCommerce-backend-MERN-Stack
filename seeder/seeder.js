import mongoose from 'mongoose'
import products from './data.js'
import Product from '../models/Products.js'


const seedProducts = async () => {
    try{

        await mongoose.connect("mongodb://localhost:27017/eCommerece-v1").then(console.log("Database Connected Successfully for Seeding Products"))

        await Product.deleteMany().then(console.log("Products Deleted successfully"))

        await Product.insertMany(products).then(console.log("Products Added successfully"))

        process.exit();

    }catch (error){
        console.log(error.message)
        process.exit();
    }
}

seedProducts();