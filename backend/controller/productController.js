const AppError = require("../utils/appError");
const catchErrorAsync = require("../utils/catchUtil");

const ProductModel = require("../model/product");

const createProduct = catchErrorAsync(async (req, res, next) => {
   const product = await ProductModel.create(req.body);

   res.status(201).json({
      message: "product yaratildi",
      product,
   });
});

const getByIdPRoduct = catchErrorAsync(async (req, res, next) => {
   const product = await ProductModel.findById(req.params.id);
   if (!product) {
      return next(new AppError("Product topilmadi", 404));
   }
   res.status(200).json({
      message: "product",
      product,
   });
});
const getAllProducts = catchErrorAsync(async (req, res, next) => {
   const products = await ProductModel.find();
   res.status(200).json({
      message: products.length + " product",
      products,
   });
});

module.exports = { createProduct, getByIdPRoduct, getAllProducts };
