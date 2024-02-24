import mongoose from "mongoose";
const classSchema = mongoose.Schema(
    {
      className: {
        type: String,
        required: true,
      },
      classCode: {
        type: String,
        required: true,
      },
      classTeacher: {
        type: String,
        required: true,
      },
      folderId: {
        type: String,
      },
      subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    },
    {
      timestamps: true,
    }
  );

export const Class = mongoose.model("Class", classSchema);