import mongoose from "mongoose";
const teacherSchema = mongoose.Schema({
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
  
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      default: "Teacher",
      required: true,
    },
    degree: {
      type: String,
      trim: true,
      require:true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    middleName: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      maxLength: 50,
    }
  },{
    timestamps:true
  });
  
export const teacherData = mongoose.model("teacher", teacherSchema);
  