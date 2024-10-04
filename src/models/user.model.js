import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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
    role: {
<<<<<<< Updated upstream
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
=======
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
>>>>>>> Stashed changes
}, {
    timestamps: true,
});

<<<<<<< Updated upstream
export default mongoose.model('User', userSchema)

=======
export default mongoose.model('User', userSchema);
>>>>>>> Stashed changes
