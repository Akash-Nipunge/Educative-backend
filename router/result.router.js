import express from 'express'
import { SubmitResult } from '../controller/result/create.result.js';
import {searchResultByStudent} from '../controller/result/get.result.js'
import { getStudentById } from '../service/getStudentById.service.js';
import { searchStudents } from '../service/searchStudents.service.js';
export const resultRouter = express.Router();
resultRouter.get('/search',searchStudents);
resultRouter.get('/get',getStudentById);
resultRouter.get('/view',searchResultByStudent);
resultRouter.post('/submit',SubmitResult);