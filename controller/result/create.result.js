import { Result } from "../../model/result.model.js";
import { StudentData } from "../../model/student.model.js";
export const SubmitResult = async (req, res) => {
  try {
    const { student, subjects } = req.body;
    if (!student || !subjects) {
      return res.status(400).json({
        success:false,
        message: "No Data Provided",
      });
    }

    let existingResult = await Result.findOne({ student: student._id });

    if (!existingResult) {
      existingResult = await Result.create({
        student: student._id,
        subjects: subjects,
      });

      await StudentData.findByIdAndUpdate(student._id, {
        $set: { result: existingResult._id },
      });
    } else {
      existingResult.subjects.push(...subjects);
      existingResult = await existingResult.save();
    }

    //console.log(existingResult);
    res.status(200).json({
      success:true,
      message: "Subjects added to result successfully",
      data: existingResult,
    });
  } catch (error) {
    res.status(400).send({
        success:false,
        message:"Something went wrong in Creation of Result!"
    })
  }
};
