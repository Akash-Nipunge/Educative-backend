import {teacherData} from '../../../model/teacher.model.js'
import asyncHandler from 'express-async-handler'
export const getUsers = asyncHandler(async (req, res) => {
    try {
      const filter = req.query.filter || "";
      const users = await teacherData.find({
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
          { email: { $regex: filter, $options: "i" } },
        ],
      });
  
      res.status(200).json({
        users: users.map((user) => ({
          username: user.username,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          role: user.role,
          _id: user._id,
        })),
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });