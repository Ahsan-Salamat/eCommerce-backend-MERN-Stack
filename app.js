import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbConnect.js'
import errorMiddleware from './middlewares/errors.js'
const app = express()
dotenv.config({path:'backend/config/config.env'})

connectDB();

app.use(express.json())

//import all routes
import productRoutes from './routes/products.js'

app.use('/api/v1' , productRoutes)

app.use(errorMiddleware)



const server = app.listen(process.env.PORT,()=>{
    console.log(`"Server has been started at Port ${process.env.PORT} in ${process.env.NODE_ENV}"`)
})

process.on("unhandledRejection", (err)=>{
    console.log("ERROR: ", err);
    console.log("Shutting down the Server due to unhandled Promise Rejection :500");
    server.close(()=>{
        process.exit(1);
    })
})