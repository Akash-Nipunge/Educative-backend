import { Unit } from "../../model/unit.model.js";
import {getAllFiles} from '../../service/fileService.js'
export async function getAllFilesInAFolder(req, res) {
  try {
    const folder = await Unit.findById(req.params.unitId);
    if (!folder) {
      return res.status(400).send({
        success: false,
        message: "Data not found!",
      });
    }
    const files = await getAllFiles(folder.folderId);
    return res.status(200).send(files);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Something Went Wrong!",
    });
  }
}
