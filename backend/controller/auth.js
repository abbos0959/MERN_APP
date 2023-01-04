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
   if (!email || !password) {
      return next(new AppError("siz parol va email kiritishingiz shart"));
   }

   if (!user) {
      return next(new AppError("Bunday user mavjud emas", 404));
   }

   const compare = await bcrypt.compare(password, user.password);

   if (!compare) {
      return next(new AppError("Parol yoki email xato", 401));
   }
   JwtToken(user, 200, res);
});

const Logout = catchErrorAsync(async (req, res, next) => {
   res.clearCookie("token", null, {
      maxAge: new Date(Date.now()),
      httpOnly: true,
   });

   res.status(200).json({
      message: "Logout User",
   });
});

const getAllUsers = catchErrorAsync(async (req, res, next) => {
   try {
      const users = await UserModel.find();

      return res.status(200).json({
         HammaUserlarSoni: users.length,
         users,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
});

const getSingleUser = catchErrorAsync(async (req, res, next) => {
   try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
         return next(new AppError("Bunday user mavjud emas", 404));
      }

      res.status(200).json({
         user,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
});

const deleteUser = catchErrorAsync(async (req, res, next) => {
   try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) {
         return next(new AppError("Bunday user mavjud emas", 404));
      }

      res.status(200).json({
         message: "delete user",
         user,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
});

const updateUser = catchErrorAsync(async (req, res, next) => {
   try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);

      if (!user) {
         return next(new AppError("Bunday user mavjud emas", 404));
      }
      res.status(200).json({
         message: "update user",
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
});

const blockUser = catchErrorAsync(async (req, res, next) => {
   const id = req.params.id;

   const user = await UserModel.findById(id);
   if (!user) {
      return next(new AppError("Bunday user mavjud emas", 404));
   }
   user.isBlocked = true;

   await user.save();
   res.status(200).json({
      message: "block user",
   });
});
const unblockUser = catchErrorAsync(async (req, res, next) => {
   const id = req.params.id;

   const user = await UserModel.findById(id);
   if (!user) {
      return next(new AppError("Bunday user mavjud emas", 404));
   }
   user.isBlocked = false;

   await user.save();
   res.status(200).json({
      message: "unblock user",
   });
});

// ==========================     finish auth======================== ========//

module.exports = {
   Register,
   login,
   getAllUsers,
   getSingleUser,
   deleteUser,
   updateUser,
   Logout,
   blockUser,
   unblockUser,
};
