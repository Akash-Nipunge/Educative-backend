import mongoose from "mongoose";
const StudentSchema = mongoose.Schema(
  {
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

    rollNo: {
      type: Number,
      required: [true, "Please provide your Roll No."],
      index: { unique: true },
      trim: true,
      default: 0,
    },
    role: {
      type: String,
      default: "Student",
      required: true,
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
    },
    result: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
    },
  },

  {
    timestamps: true,
  }
);

StudentSchema.pre("save", async function (next) {
  const lastUser = await StudentData.findOne({}, {}, { sort: { rollNo: -1 } });
  this.rollNo = (lastUser && lastUser.rollNo + 1) || 1;
  next();
});

export const StudentData = mongoose.model("student", StudentSchema);
