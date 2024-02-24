import asynchandler from 'express-async-handler'
import { Class } from '../../model/class.model.js';
import { createClassFolder } from '../../service/class.service.js';
export const createNewClass = asynchandler(async (req, res) => {
  try {
    const { className, classCode, classTeacher } = req.body;
    if (!className || !classCode || !classTeacher) {
      throw new Error("Incomplete data provided for class creation.");
    }

    const existingClass = await Class.findOne({ className, classCode });
    if (existingClass) {
      throw new Error("Class with the same name and code already exists.");
    }

    const newClass = new Class({ className, classCode, classTeacher });
    await newClass.save();

    const folderId = await createClassFolder(
      className,
      classCode,
      process.env.FOLDER_ID
    );
    newClass.folderId = folderId;
    await newClass.save();

    return res.status(400).json({
      data: newClass,
      message: "Class created successfully.",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
});
