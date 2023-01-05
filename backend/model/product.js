const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true,
      },
      slug: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
      },
      description: {
         type: String,
         trim: true,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },

      category: {
         type: String,
      },
      quantity: { type: Number, required: true },
      images: { type: Array },

      brand: {
         type: String,
      },
      color: {
         type: String,
      },
      ratings: [
         {
            star: Number,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
         },
      ],
      sold: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("products", ProductSchema);
