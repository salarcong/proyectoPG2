import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        /* Toma en cuenta solo caracteres y no espacios */
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema)