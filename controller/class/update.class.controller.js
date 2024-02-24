import asynchandler from 'express-async-handler'
import { Class } from '../../model/class.model.js';
export const renameClassName = asynchandler(async (req, res) => {
    try {
      const { classId, newName } = req.body;
      const updatedSubject = await Class.findByIdAndUpdate(
        classId,
        { className: newName },
        { new: true }
      ).populate("subjects");
      return res.status(200).json({
        data: updatedSubject,
        message: "Class updated successfully",
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error Occured In Updation Of Data!"
      });
    }
  });