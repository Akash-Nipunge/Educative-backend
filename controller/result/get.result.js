import { Result } from "../../model/result.model.js";
import { StudentData } from "../../model/student.model.js";
export const searchResultByStudent = async (req, res) => {
  const studentId = req.query.query;
  //console.log(studentId)
  try {
    const data = await StudentData.findOne({_id:studentId});
    const student = await Result.findOne({_id:data.result})
    //console.log("student : ",student)
    if (!student) {
      return res.status(404).send({
        message: "Student Not Found",
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      student
    });
  } catch (error) {
    //console.log("Error", error);
    res.status(400).send({
      success: false,
      message: "Error Occured In getting Result Data!",
    });
  }
};
