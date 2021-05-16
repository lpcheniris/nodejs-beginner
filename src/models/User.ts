import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true, minlength: 3 }
})

export const User = mongoose.model("User", UserSchema)