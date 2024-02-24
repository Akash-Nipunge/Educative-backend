import {StudentData} from '../../../model/student.model.js'
import { teacherData } from '../../../model/teacher.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
export const register = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    //console.log(data)
    const existingUser = await teacherData.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("User Already Exists!");
    }

    const otherMailExist = await StudentData.findOne({ email: data.email });
    if (otherMailExist) {
      throw new Error("Email already Exists in Student Data!");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await teacherData.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      degree: data.degree,
      isVerify: data.isVerify,
    });
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
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    return res.status(400).send({
        success:false,
        message:error.message
    })
  }
});
