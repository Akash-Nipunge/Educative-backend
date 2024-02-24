import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    subjectName: {
      type: String,
      required: [true, "Subject name is required"],
    },
    folderId: {
      type: String,
    },
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
  });
  
  const unitSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    folderId: {
      type: String,
    },
  });

export const Subject = mongoose.model("Subject", subjectSchema);