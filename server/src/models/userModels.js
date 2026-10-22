import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type:String,
      unique:true,
      sparse:true,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "seller"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
