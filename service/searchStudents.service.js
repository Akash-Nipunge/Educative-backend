import asyncHandler from 'express-async-handler'
import { StudentData } from '../model/student.model.js';
export const searchStudents = asyncHandler(async (req, res) => {
    try {
      const keyword = req.query.query
        ? {
            $or: [
              { name: { $regex: req.query.query, $options: "i" } },
              { email: { $regex: req.query.query, $options: "i" } },
            ],
          }
        : {};
      const users = await StudentData.find(keyword);

      res.send(users);
    } catch (error) {
      res.status(400).json({
        message: "No student Found!",
      });
    }
  });