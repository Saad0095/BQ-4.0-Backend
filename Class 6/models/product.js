const {Schema,model} = require('mongoose')

const productSchema = new Schema({
    title: String,
    price: Number,
    quantity: Number,
})

const Product = model("Product",productSchema)

module.exports = Product;
// export default Product