import {StudentData} from '../../../model/student.model.js'
import {teacherData} from '../../../model/teacher.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
export const register = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const existingUser = await StudentData.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already taken");
    }

    const otherMailExist = await teacherData.findOne({ email: data.email });
    if (otherMailExist) {
      throw new Error("Email already taken");
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await StudentData.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    });
    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName:user.lastName,
        role:user.role
      },
      process.env.JWT_SECRET
    );
    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error in registration of user:", error.message);
    res.status(400).send(error.message);
  }
});
