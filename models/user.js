const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
    {
        user_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = User
