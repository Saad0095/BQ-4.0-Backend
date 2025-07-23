import express from "express"
import './db/index.js'
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
app.use(express.json());

app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

app.listen(3000);
