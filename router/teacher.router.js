import { Router } from 'express';
import { register } from '../controller/user/teacher/register.teacher.controller.js';
import { login } from '../controller/user/teacher/login.teacher.controller.js';

// import { register, login, updateUser, getUsers, verifyMail } from '../controller/teacher';
// import { authMiddleware } from '../middleware/auth';

export const teacherRouter = Router()

teacherRouter.post('/signup',register)
teacherRouter.post('/signin',login);

// teacherRouter.put('/update',authMiddleware,updateUser);
// teacherRouter.get('/teachers',authMiddleware,getUsers);
// teacherRouter.get('/verify',verifyMail);