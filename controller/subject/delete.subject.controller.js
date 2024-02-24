import asyncHandler from 'express-async-handler'
import { Subject } from '../../model/subject.model.js';
export const deleteSubject = asyncHandler(async (req, res) => {
    try {
      const { subjectId } = req.query;
      const deleteSub = await Subject.findByIdAndDelete(subjectId);
      if (!deleteSub) {
        throw new Error("Subject not Found");
      }
      await Class.updateMany(
        { subjects: deleteSub._id },
        { $pull: { subjects: deleteSub._id } }
      );
      res.status(200).send({
        success: true,
        message: "Subject has been Deleted successfully!",
      });
    } catch (error) {
      let err = error || "Internal Server Error";
      res.status(500).send({
        success: false,
        message : err,
      });
    }
  });