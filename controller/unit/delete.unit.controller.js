import asyncHandler from 'express-async-handler'
import {Unit} from '../../model/unit.model.js'
import { Subject } from '../../model/subject.model.js';
export const deleteUnits = asyncHandler(async (req, res) => {
    try {
      const id = req.params.unitid;
      const deletedUnit = await Unit.findByIdAndDelete(id);
  
      if (!deletedUnit) {
        throw new Error("Unit not found");
      }
  
      //console.log("Deleted!");
  
      await Subject.updateMany(
        { units: deletedUnit._id },
        { $pull: { units: deletedUnit._id } }
      );
  
      res.status(200).send({
        success: true,
        message: "Unit has been Deleted",
      });
    } catch (error) {
     
      res.status(500).send({
        success: false,
        message:error.message,
      });
    }
  });