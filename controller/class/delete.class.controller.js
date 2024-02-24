import asynchandler from 'express-async-handler'
import { Class } from '../../model/class.model.js';
export const deleteClass = asynchandler(async (req, res) => {
    try {
      const classId = req.params.id;
  
      // Assuming Class.deleteOne() triggers pre-delete hooks defined in the schema
  
      const exitsClass = await Class.findOne({ _id: "65b38dba38d3bed6c62bebaf" });
      //console.log(classId);
      if (!exitsClass) {
        throw new Error("Class Not Found");
      }
  
      await Class.deleteOne({ _id: classId });
      //console.log("Data is Deleted");
      res
        .status(204)
        .json({
          status: true,
  
          message: "class is Deleted",
        })
        .end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });