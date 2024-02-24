import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import multer from 'multer';
import { upload } from './controller/file/upload.file.controller.js';
import connectDB from './databases/connectDb.js';
import {fileRouter} from './router/file.router.js'
import {resultRouter} from './router/result.router.js'
import dotenv from 'dotenv'
dotenv.config()
import { authMiddleware } from './middleware/auth.js';
const app = express();
// Middleware
const corsConfig = {
  origin:"*",
  credential:true,
  methods:["GET","POST","PUT","DELETE"]
}
app.options("",cors(corsConfig))
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Define multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    if (file.mimetype.startsWith("image")) {
      uploadPath += "images/";
    } else if (file.mimetype === "application/pdf") {
      uploadPath += "pdfs/";
    } else {
      return cb({ error: "Mime type not supported" });
    }

    cb(null, uploadPath);
  },
});

const multer_upload = multer({ storage });

// Routes
app.post(
  "/api/v1/class/subject/unit/content/file/upload/:unitId",
  multer_upload.single("file"),
  upload
);

// Define routes with Router
import {studentRouter} from './router/student.router.js'
import { teacherRouter } from './router/teacher.router.js';
import {adminRouter} from './router/admin.router.js'
import { classRouter } from './router/class.router.js';
import { subjectRouter } from './router/subject.router.js';
import {unitRouter} from './router/unit.router..js'



app.use("/api/v1/user/student", studentRouter);
app.use("/api/v1/user/teacher", teacherRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/class/subject", subjectRouter);
app.use("/api/v1/class/subject/unit", unitRouter);
app.use("/api/v1/class/subject/unit/content/file", fileRouter);
app.use("/api/v1/class/result", resultRouter);
app.use("/api/v1/admin",adminRouter);

app.get("/", (req, res) => {
  //console.log("App is running fine!!");
  res.json({ message: "App is running fine...." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
(async () => {
  await connectDB();
})()
  .then(() => {
    app.listen(PORT, () => {
      //console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    //console.log("server error");
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
