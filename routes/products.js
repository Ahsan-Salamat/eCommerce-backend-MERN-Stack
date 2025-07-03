import express from "express";
import {
  getProducts,
  newProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";
import { isAuthenicatedUser } from "../middlewares/auth.js";

const routes = express.Router();

routes.route("/products").get(isAuthenicatedUser,getProducts);
routes.route("/admin/products").post(newProducts);
routes.route("/products/:id").get(getProductDetail);
routes.route("/products/:id").put(updateProduct);
routes.route("/products/:id").delete(deleteProduct);

export default routes;
