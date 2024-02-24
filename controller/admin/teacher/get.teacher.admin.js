import asyncHandler from 'express-async-handler'
import {teacherData} from '../../../model/teacher.model.js'
export const searchTeacher = asyncHandler(async (req, res) => {
    try {
      const keyword = req.query.query
        ? {
            $or: [
              { name: { $regex: req.query.query, $options: "i" } },
              { email: { $regex: req.query.query, $options: "i" } },
            ],
          }
        : {};
      const users = await teacherData.find(keyword);

      res.send(users);
    } catch (error) {
      res.status(400).json({
        message: "No Teacher Found!",
      });
    }
  });