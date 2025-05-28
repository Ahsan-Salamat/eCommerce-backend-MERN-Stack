import express from 'express'
import {getProducts,newProducts} from '../controllers/productsControllers.js'

const routes = express.Router()

routes.route('/products').get(getProducts)
routes.route('/admin/products').post(newProducts)

export default routes