import { Schema, model, Document } from 'mongoose'

export interface UserType extends Document {
    name: string
    email: string
    password: string
    isAdmin?: String
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

const User = model<UserType>('User', userSchema)

export default User