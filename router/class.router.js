import express from 'express'
import { getAllClasses } from '../controller/class/get.class.controller.js';
import { createNewClass } from '../controller/class/create.class.controller.js';
import { deleteClass } from '../controller/class/delete.class.controller.js';
import { renameClassName } from '../controller/class/update.class.controller.js';
import {authMiddleware} from '../middleware/auth.js'
export const classRouter = express.Router();

classRouter.get("/",authMiddleware,getAllClasses);
classRouter.post("/add",authMiddleware, createNewClass);
classRouter.put("/rename", authMiddleware, renameClassName);
classRouter.delete("/delete", authMiddleware, deleteClass);
