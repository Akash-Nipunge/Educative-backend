import express from 'express'
import { getAllUnits } from '../controller/unit/get.unit.controller.js';
import { createNewUnit } from '../controller/unit/create.unit.controller.js';
import { updateUnits } from '../controller/unit/update.unit.controller.js';
import { deleteUnits } from '../controller/unit/delete.unit.controller.js';
export const unitRouter = express.Router();

unitRouter.get('/:subjectid',getAllUnits);
unitRouter.post('/:subjectid/add',createNewUnit);
unitRouter.put('/:subjectid/update',updateUnits);
unitRouter.delete('/:subjectid/delete/:unitid',deleteUnits);