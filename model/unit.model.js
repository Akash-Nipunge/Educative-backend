import mongoose from "mongoose";
const unitSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    folderId: {
      type: String,
    },
  });

export const Unit = mongoose.model("Unit", unitSchema);