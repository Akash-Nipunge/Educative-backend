import asyncHandler from 'express-async-handler'
import { Class } from '../../model/class.model.js';
import { Subject } from '../../model/subject.model.js';
import { createOtherFolder } from '../../service/class.service.js';
export const createNewSubject = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const classID = req.params.classid;
    if (!classID) {
      return res.status(400).send({
        success: false,
        message: "Class doesn't exists!",
      });
    }

    // Create the subject and associate it with the specified class
    const exists = await Class.findById(classID);
    const folderId = await createOtherFolder(data.subject, "", exists.folderId);
    if (!folderId) {
      return res.status(400).send({
        success: false,
        message: "Not able to find the parent FolderId",
      });
    }
    const subject = await Subject.create({
      subjectName: data.subject,
      classID: classID,
      folderId: folderId,
    });

    const class1 = await Class.findOne({ _id: classID });
    class1.subjects.push(subject._id);
    await class1.save();

    return res.status(200).send({
      success: true,
      message: "Subject has been created",
      data: subject,
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.subjectName
    ) {
      // Duplicate subjectName error
      return res.status(400).json({
        success: false,
        message: "Duplicate subjectName. Please choose a different name.",
      });
    }
    else
    return res.status(500).send({
      success: false,
      message: "Internal Server Error!",
    });
  }
});
