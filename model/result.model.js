import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
  
    subjects: [
      {
        subjectName: {
          type: String,
          required: true,
        },
        marksObtained: {
          type: Number,
          required: true,
        },
        totalMarks: {
          type: Number,
          required: true,
        },
      },
    ],
  });
  
export const Result = mongoose.model("Result", resultSchema);