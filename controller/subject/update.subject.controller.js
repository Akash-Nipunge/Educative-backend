import asyncHandler from 'express-async-handler'
import { Subject } from '../../model/subject.model.js';
export const updateSubjectName = asyncHandler(async (req, res) => {
    try {
      const { subjectId, NewSubjectName } = req.body;
  
      if (!subjectId) {
        throw new Error("Subject is Not Found");
      }
  
      if (!NewSubjectName) {
        throw new Error("Pelase Enter the Subject Name");
      }
  
      const updatedSubject = await Subject.findByIdAndUpdate(
        subjectId,
        {
          subjectName: NewSubjectName,
        },
        {
          new: true,
        }
      ).populate("units");
  
      res.status(200).json({
        success: true,
        message: "Subject has been Updated",
        data: updatedSubject,
      });
    } catch (error) {
      let err = error || "Internal Server Error";
      res.status(500).send({
        success: false,
        message : err,
      });
    }
  });