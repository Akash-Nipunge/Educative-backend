import express from 'express'
import { getAllFilesInAFolder } from '../controller/file/get.file.controller.js';
import { upload } from '../controller/file/upload.file.controller.js';
export const fileRouter = express.Router();
fileRouter.get("/gets/:unitId",getAllFilesInAFolder);
fileRouter.post("/upload/:unitId",upload)

