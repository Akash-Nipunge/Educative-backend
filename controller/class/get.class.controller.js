import {Class} from '../../model/class.model.js'
import asynchandler from 'express-async-handler'
export const getAllClasses = asynchandler(async (req, res) => {
    const classes = await Class.find({}).populate("subjects");
    if (!classes || classes.length == 0)
      return res.status(200).json({ message: "classes Are not allocated" });
    else {
      return res.status(200).json({
        success: true,
        classes,
      });
    }
  });