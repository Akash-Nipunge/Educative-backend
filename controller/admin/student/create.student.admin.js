import asyncHandler from "express-async-handler";
import { StudentData } from "../../../model/student.model.js";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import { z } from 'zod'; 
import { teacherData } from "../../../model/teacher.model.js";

const signupSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string(),
    password: z.string(),
});

export const registerStudentByAdmin = asyncHandler(async (req, res) => {
    try {
        const { success, data } = signupSchema.safeParse(req.body);
        //console.log(data)
        if (!success) {
            throw new Error("Invalid input data");
        }

        let existingUser = await StudentData.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("Email already taken");
        }

        existingUser = await teacherData.findOne({ email: data.email });
        if (existingUser) {
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

        // Generate JWT token
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET);

        res.status(200).json({ message: "User created successfully", token });
    } catch (error) {
        console.error("Error in register:", error.message);
        res.status(400).json({ error: error.message || "Failed to create user" });
    }
});
