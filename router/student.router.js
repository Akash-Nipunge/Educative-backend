import express from 'express'
// import { authMiddleware } from '../middleware/auth.js';
import {register} from '../controller/user/student/register.student.controller.js'
import {login} from '../controller/user/student/login.student.controller.js';
// import updateUser from '../controller/user/student/update.student.controller.js';
export const studentRouter = express.Router();
studentRouter.post('/signup',register);
studentRouter.post('/signin',login);
// router.put("/",authMiddleware,updateUser);
// router.get("/bulk", authMiddleware,getUsers);