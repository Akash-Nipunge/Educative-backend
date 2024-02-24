import express from 'express'
import { getAllSubjects } from '../controller/subject/get.subject.controller.js';
import { createNewSubject } from '../controller/subject/create.subject.controller.js';
import { updateSubjectName } from '../controller/subject/update.subject.controller.js';
import { deleteSubject } from '../controller/subject/delete.subject.controller.js';
export const subjectRouter = express.Router();


subjectRouter.get('/:classid',getAllSubjects);
subjectRouter.post('/add/:classid',createNewSubject);
subjectRouter.put('/update',updateSubjectName);
subjectRouter.delete('/delete',deleteSubject);