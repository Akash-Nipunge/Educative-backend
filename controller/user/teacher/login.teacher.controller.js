import { teacherData } from "../../../model/teacher.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
export const login = asyncHandler(async (req, res) => {
  try {
    //console.log("teachers login!!!!")
    const data = req.body;
    const user = await teacherData.findOne({
      email: data.email,
    });
    if (!user) {
      throw new Error("user doesn't exist");
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
      res.json({
        success: true,
        role : user.role,
        firstName:user.firstName,
        middleName:user.middleName,
        lastName:user.lastName,
        message: "User logged In successfully!",
        token,
      });
    } else {
      throw new Error("Invalid Username and Password!");
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
});
