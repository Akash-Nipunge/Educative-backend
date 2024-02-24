import { StudentData } from "../model/student.model.js";
export const getStudentById = async (req, res) => {
    const studentId = req.query.query;
  
    if (!studentId) {
      return res.status(400).json({
        status: "fail",
        message: "Student Id Not Found",
      });
    }
  
    try {
      const student = await StudentData.findById(studentId);
  
      if (!student) {
        return res.status(404).json({
          message: "Student Not Found",
          success: false,
        });
      }
  
      res.status(200).json({
        status: "success",
        student,
      });
    } catch (error) {
      //console.log("Error:", error.message);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };