import express from "express";
import {
  getProducts,
  newProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";

const routes = express.Router();

routes.route("/products").get(getProducts);
routes.route("/admin/products").post(newProducts);
routes.route("/products/:id").get(getProductDetail);
routes.route("/products/:id").put(updateProduct);
routes.route("/products/:id").delete(deleteProduct);

export default routes;
