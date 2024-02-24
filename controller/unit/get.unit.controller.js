import { Subject } from '../../model/subject.model.js';
export const getAllUnits = async (req, res) => {
    try {
      const units = await Subject.findOne({_id:req.params.subjectid}).populate("units");
      if (!units || units === 0) {
        res.status(200).json({
          success: true,
          units,
          message: "Empty Subject",
        });
      }
      res.status(200).json({
        success: true,
        data: units.units
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };