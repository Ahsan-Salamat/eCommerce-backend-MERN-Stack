import express, { Router } from "express";
import { newOrder ,getOrderDetail, myOrderDetail } from '../controllers/orderController.js'
const router = express.Router();


import { isAuthenicatedUser } from "../middlewares/auth.js";

router.route('/order/new').post(isAuthenicatedUser,newOrder);
router.route('/order/:_id').get(isAuthenicatedUser,getOrderDetail);
router.route('/my/order').get(isAuthenicatedUser,myOrderDetail);

export default router;