import asyncHandler from 'express-async-handler'
import {Unit} from '../../model/unit.model.js'
export const updateUnits = asyncHandler(async (req, res) => {
    try {
      const data = req.body;
      await Unit.findByIdAndUpdate(
        data.unitId,
        {
          title: data.title,
          description: data.description,
        },
        {
          new: true,
        }
      );
  
      res.status(200).send({
        success: true,
        message: "Unit has been Updated!",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message : "Something Went Wrong in Updation of Unit!"
      });
    }
  });