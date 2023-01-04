const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const JwtToken = require("../utils/jwtToken");
const catchErrorAsync = require("../utils/catchUtil");
const AppError = require("../utils/appError");

const Register = async (req, res, next) => {
   try {
      const { firstName, lastName, email, password, mobil } = req.body;

      if (password.toString().length < 3) {
         return next(
            new AppError("Parol uzunligi kamida 3 ta belgidan iborat bo'lishi kerak", 400)
         );
      }

      const hash = await bcrypt.hash(password.toString(), 10);

      const isuser = await UserModel.findOne({ email });
      if (isuser) {
         return res.status(400).json({ message: "Bunday user allaqachon mavjud" });
      }

      const user = await UserModel.create({
         firstName,
         lastName,
         email,
         password: hash,
         mobil,
      });

      JwtToken(user, 200, res);
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

const login = catchErrorAsync(async (req, res, next) => {
   const { email, password } = req.body;
   const user = await UserModel.findOne({ email });

   if (!user) {
      return next(new AppError("Bunday user mavjud emas", 404));
   }

   const compare = await bcrypt.compare(password, user.password);

   if (!compare) {
      return next(new AppError("Parol yoki email xato", 401));
   }
   JwtToken(user, 200, res);
});
module.exports = { Register, login };
