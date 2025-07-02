import catchAsyncError from "../middlewares/catchAsyncError";
import User from "../models/userModel";

export const registerUser = catchAsyncError(async (req, res, next) => {
    const {name , email , password} = req.body;

    const user = await User.created({name,email,password});

    res.status(201).json({
        success: true,
    });
});