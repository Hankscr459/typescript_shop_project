import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser extends Document {
    name: string
    email: string
    password: string
    role?: string
    bonusPoint: number
    history: object[]
}

const userSchema: Schema<IUser> = new Schema({
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
    role: {
        type: String,
        required: true,
        default: 'Member'
    },
    bonusPoint: {
        type: Number,
        required: true,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = model('User', userSchema)

export default User