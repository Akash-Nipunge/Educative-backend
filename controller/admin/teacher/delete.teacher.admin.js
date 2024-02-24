import asyncHandler from 'express-async-handler';

import { teacherData } from '../../../model/teacher.model.js';

export const deleteTeacherByAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(req.params)

    if (!id) {
      throw new Error('Student ID is missing.');
    }

    const data = await teacherData.findByIdAndDelete(id);

    if (!data) {
      throw new Error('Student not found.');
    }

    res.status(200).json({
      success: true,
      message: 'Teacher deleted successfully.',
    });
  } catch (err) {
    const errorMessage = err.message || 'Internal Server Error';

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
});
