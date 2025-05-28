import express from 'express'
import mongoose from 'mongoose'

const connectDB = ()=>{
    
    let DB_URI = "";

    if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI
    if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI

    mongoose.connect(DB_URI).then((con)=>{
        console.log(`MongoDB has been connected to Host: ${con?.connection?.host}`)
    })
}

export default connectDB