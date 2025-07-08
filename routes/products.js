import express from "express";
import {
  getProducts,
  newProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
  createUpdateReviews
} from "../controllers/productsControllers.js";
import { isAuthenicatedUser,authorizeRoles } from "../middlewares/auth.js";

const routes = express.Router();

routes.route("/products").get(getProducts);
routes.route("/products/:id").get(getProductDetail);
routes.route("/reviews").get(isAuthenicatedUser,createUpdateReviews);


// Admin routes
routes.route("/admin/products").post(isAuthenicatedUser,authorizeRoles("admin"),newProducts);
routes.route("/products/:id").put(isAuthenicatedUser,authorizeRoles("admin"),updateProduct);
routes.route("/products/:id").delete(isAuthenicatedUser,authorizeRoles("admin"),deleteProduct);

export default routes;
