import express from "express";
import {
  getProducts,
  newProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
  createUpdateReviews,
  getAllReview,
  deleteReviews
} from "../controllers/productsControllers.js";
import { isAuthenicatedUser,authorizeRoles } from "../middlewares/auth.js";

const routes = express.Router();

routes.route("/products").get(getProducts);
routes.route("/products/:id").get(getProductDetail);
routes.route("/reviews/new").get(isAuthenicatedUser,createUpdateReviews);
routes.route("/reviews").get(getAllReview);
routes.route("/admin/reviews").delete(isAuthenicatedUser,authorizeRoles("admin"),deleteReviews);


// Admin routes
routes.route("/admin/products").post(isAuthenicatedUser,authorizeRoles("admin"),newProducts);
routes.route("/products/:id").put(isAuthenicatedUser,authorizeRoles("admin"),updateProduct);
routes.route("/products/:id").delete(isAuthenicatedUser,authorizeRoles("admin"),deleteProduct);

export default routes;
