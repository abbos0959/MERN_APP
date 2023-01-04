const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: [true, "siz firstname kiritishingiz shart"],
         trim: true,
         min: 2,
         max: 40,
      },
      lastName: {
         type: String,
         required: [true, "siz lastname kiritishingiz shart"],

         trim: true,
         min: 2,
         max: 40,
      },
      email: {
         type: String,
         required: [true, "siz email kiritishingiz shart"],

         trim: true,
         unique: true,
      },
      password: {
         type: String,
         required: [true, "siz password kiritishingiz shart"],

         trim: true,
      },
      mobil: {
         type: String,
         required: [true, "siz mobile kiritishingiz shart"],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("users", UserSchema);
