import asyncHandler from 'express-async-handler';
import { StudentData } from '../../../model/student.model.js';

export const deleteStudentByAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(req.params)

    if (!id) {
      throw new Error('Student ID is missing.');
    }

    const data = await StudentData.findByIdAndDelete(id);

    if (!data) {
      throw new Error('Student not found.');
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully.',
    });
  } catch (err) {
    const errorMessage = err.message || 'Internal Server Error';

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
});
