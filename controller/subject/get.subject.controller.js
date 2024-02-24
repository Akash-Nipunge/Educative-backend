import { Class } from '../../model/class.model.js';
export const getAllSubjects = async (req, res) => {
    try {
      const response = await Class.findOne({ _id: req.params.classid }).populate(
        "subjects"
      );
      const subjects = response.subjects;
  
      if (!subjects || subjects === 0) {
        return res.status(200).send({
          success: true,
          data: [],
          message: "Empty Subject",
        });
      }
      return res.status(200).json({
        success: true,
        data: subjects,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:"Something Went Wrong!"
      });
    }
  };