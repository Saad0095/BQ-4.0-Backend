const {Schema,model} = require('mongoose')

const orderSchema = new Schema([{
    title: String,
    quantity: Number
}])

const Order = model('Order',orderSchema)
module.exports = Order