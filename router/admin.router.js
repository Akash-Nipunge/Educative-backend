import express from 'express';
import { registerStudentByAdmin } from '../controller/admin/student/create.student.admin.js'
import { deleteStudentByAdmin } from '../controller/admin/student/delete.student.admin.js';
import { searchStudents } from '../service/searchStudents.service.js';
import { searchTeacher } from '../controller/admin/teacher/get.teacher.admin.js';
import { deleteTeacherByAdmin } from '../controller/admin/teacher/delete.teacher.admin.js';
import { createTeacherByAdmin } from '../controller/admin/teacher/create.teacher.admin.js';
export const adminRouter = express.Router();

adminRouter.post('/student/register',registerStudentByAdmin);
adminRouter.get('/students',searchStudents);
adminRouter.delete('/students/:id',deleteStudentByAdmin);


adminRouter.post('/teacher/register',createTeacherByAdmin)
adminRouter.get('/teachers',searchTeacher);
adminRouter.delete('/teachers/:id',deleteTeacherByAdmin);



