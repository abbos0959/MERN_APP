const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const JwtToken = require("../utils/jwtToken");

const Register = async (req, res) => {
   try {
      const { firstName, lastName, email, password, mobile } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const isuser = await UserModel.findOne({ email });
      if (isuser) {
         return res.status(400).json({ message: "Bunday user allaqachon mavjud" });
      }

      const user = await UserModel.create({
         firstName,
         lastName,
         email,
         password: hash,
         mobile,
      });

      JwtToken(user, 200, res);
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

module.exports = { Register };
