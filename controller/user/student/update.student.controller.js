import { StudentData } from "../../../model/student.model";
const updateUser = asyncHandler(async (req, res) => {
    try {
      const data = req.body;
      await StudentData.updateOne({ _id: req.userId }, { $set: data });
      res.status(200).send({
        success:true,
        message:"User Updated Successfully!"
      })
    } catch (error) {
      res.status(400).send({
        success:false,
        message:"Something Went Wrong in Updation Of User!"
      });
    }
  });