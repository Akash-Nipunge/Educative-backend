import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  originalname: { type: String, required: true },
  mimeType: { type: String, required: true },
  fileId: { type: String },
  fileURL: { type: String },
});

export const File = mongoose.model("File", fileSchema);
