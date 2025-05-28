import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbConnect.js'
const app = express()
dotenv.config({path:'backend/config/config.env'})

connectDB();

app.use(express.json())

//import all routes
import productRoutes from './routes/products.js'

app.use('/api/v1' , productRoutes)




app.listen(process.env.PORT,()=>{
    console.log(`"Server has been started at Port ${process.env.PORT} in ${process.env.NODE_ENV}"`)
})