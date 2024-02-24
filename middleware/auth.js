import asyncHandler from 'express-async-handler'
import { StudentData } from '../model/student.model.js';
import { teacherData } from '../model/teacher.model.js';
import jwt from 'jsonwebtoken'
export const authMiddleware = asyncHandler( async (req, res, next) => {
  //console.log(req)
  jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET,(err,decoded)=>{
    if(!err)
    {
      const userId = decoded.userId;
      const userType = decoded.role;
      //console.log(decoded)
      ;(async ()=>{
      try{
      const existing_teacher = await teacherData.findOne({_id:decoded.userId})
      next()
      }
      catch(err){
        res.status(401).send({
          success:false,
          message:"seems you are not logged in!"
        })
       next()
      }
      })();
    }
    else
    return;
    //console.log(err)
  })
});