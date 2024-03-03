import {StudentData} from "../../../model/student.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
export const login = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const user = await StudentData.findOne({ email: data.email });
    if (!user) {
      throw new Error("User Doesn't Exists!");
    }
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          userId: user._id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          role: user.role,
        },
        process.env.JWT_SECRET
      );
      res.status(200).send({
        success: true,
        firstName:user.firstName,
        middleName:user.middleName,
        lastName:user.lastName,
        message: "Logged in successfull!",
        token: token,
      });
    } else {
      throw new Error("Invalid Username and Password!");
    }
  } catch (error) {
    //console.log("error")
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});
