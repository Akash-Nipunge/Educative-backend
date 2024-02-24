import {Subject} from '../../model/subject.model.js'
import {Unit} from '../../model/unit.model.js'
import { createOtherFolder } from "../../service/class.service.js";
import asyncHandler from 'express-async-handler'
export const createNewUnit = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const subjectId = req.params.subjectid;
    //console.log("subjectid : ", subjectId);
    if (!subjectId) {
      throw new Error("Subject ID is required");
    }
    const exists = await Subject.findById(subjectId);
    const folderId = await createOtherFolder(data.title, "", exists.folderId);
    if (!folderId) {
      return res.status(400).json({
        message: "Not able to find the parent FolderId",
      });
    }
    // Create the subject and associate it with the specified class
    const unit = await Unit.create({
      title: data.title,
      description: data.description,
      folderId: folderId,
    });
    const subject = await Subject.findOne({ _id: subjectId });
    subject.units.push(unit._id);
    await subject.save();
    res.status(200).json({
      success: true,
      message: "unit has been created",
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.req.body.title
    ) {
      // Duplicate subjectName error
      return res.status(400).json({
        success: false,
        error: "Duplicate unitName. Please choose a different name.",
      });
    }
    console.error(error.message);
    return res.status(500).send({
      success:false,
      message: "Internal server error",
    });
  }
});
