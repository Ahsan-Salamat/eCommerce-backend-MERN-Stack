import express, { Router } from "express";
import {
  newOrder,
  getOrderDetail,
  myOrderDetail,
  allOrdersDetail,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
const router = express.Router();

import { isAuthenicatedUser, authorizeRoles } from "../middlewares/auth.js";

router.route("/order/new").post(isAuthenicatedUser, newOrder);
router.route("/order/:_id").get(isAuthenicatedUser, getOrderDetail);
router.route("/my/order").get(isAuthenicatedUser, myOrderDetail);

//admin routes

router.route("/admin/orders").get(isAuthenicatedUser, allOrdersDetail);
router
  .route("/admin/update/order/:_id")
  .put(isAuthenicatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenicatedUser, authorizeRoles("admin"), deleteOrder);

export default router;
