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

export const createTeacherByAdmin = asyncHandler(async (req, res) => {
    try {
        const { success, data } = signupSchema.safeParse(req.body);
        if (!success) {
            throw new Error("Invalid input data");
        }

        // Check if email already exists in teacher collection
        let existingTeacher = await teacherData.findOne({ email: data.email });
        if (existingTeacher) {
            throw new Error("Email already taken");
        }

        
        let existingStudent = await StudentData.findOne({ email: data.email });
        if (existingStudent) {
            throw new Error("Email already taken by a student");
        }

       
        const hashPassword = await bcrypt.hash(data.password, 10);

        // Create the teacher account
        const user = await teacherData.create({
            email: data.email,
            password: hashPassword,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            degree: data.degree, 
            isVerify: data.isVerify,
        });

        // Generate JWT token
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET);

        // Send response with token
        res.status(200).json({ message: "Teacher account has been created successfully", token });
    } catch (error) {
        console.error("Error in creating teacher account:", error.message);
        res.status(400).json({ error: error.message || "Failed to create teacher account" });
    }
});
