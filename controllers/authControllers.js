import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
// Register User = /api/v1/register
export const registerUser = catchAsyncError(async (req, res, next) => {
    const {name , email , password} = req.body;

    const user = await User.create({name,email,password});
    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token,
    });
});

export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email , password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password", 400));
    }
    //Find user in database
    const user = await User.findOne({email}).select("+password");
    //check if user is exists
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //check if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }


    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token,
    });
});