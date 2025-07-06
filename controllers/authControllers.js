import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/AssignToken.js";
import sendEmail from "../utils/sendEmail.js";
import resetPasswordEmail from "../utils/emailTemplates.js";


// Register User = /api/v1/register
export const registerUser = catchAsyncError(async (req, res, next) => {
    const {name , email , password} = req.body;

    const user = await User.create({name,email,password});
    const token = user.getJwtToken();

    sendToken(user, 201, res);
});

// Login User = /api/v1/login
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

    sendToken(user, 201, res);
});


// Logout User = /api/v1/logout
export const logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        message: "Logged out successfully"
    })
})

export const forgetPassword = catchAsyncError(async (req, res, next) => {
    //Find user in database
    const user = await User.findOne({email : req.body.email});
    //check if user is exists
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 404));
    }

    //Get reset password token
    const resetToken = user.getResetPasswordToken();

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = resetPasswordEmail(resetUrl, user?.name);

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;

        await user.save();
        return next(new ErrorHandler(error.message, 500));
    }

    sendToken(user, 201, res);
});