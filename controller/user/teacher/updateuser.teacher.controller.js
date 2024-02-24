import { teacherData } from "../../../model/teacher.model.js";
import asyncHandler from 'express-async-handler'
export const updateUser = asyncHandler(async (req, res) => {
    try {
      const data = req.body;
      await teacherData.updateOne({ _id: req.userId }, { $set: data });
      res.status(200).send({
        success:true,
        message: "Data Updated successfully",
      });
    } catch (error) {
      res.status(400).send({
        success:false,
        message:"Data Updation failed!"
      })
    }
  });