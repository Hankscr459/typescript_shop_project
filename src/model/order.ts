import { Schema, model, Document } from 'mongoose'

interface IOrderItem extends Document {
    name: string
    qty: number
    image: string
    price: number
    product: string
}

interface IShippingAddress extends Document {
    address: string
    city: string
    postalCode: string
    country: string
}

interface IOrder extends Document {
    user: string
    orderItem: IOrderItem[]
    ShippingAddress: IShippingAddress
    paymentMethod: string
    ShippingPrice: number
    totalPrice: number
    isPaid: boolean
    paidAt: Date
    status: string
    deliveredAt: Date
}



const orderSchema : Schema<IOrder> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItem: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { 
                type: Schema.Types.ObjectId, 
                required: true,
                ref: 'Product'
            }
        }
    ],
    ShippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    ShippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
})

const Order = model('Order', orderSchema)

export default Order