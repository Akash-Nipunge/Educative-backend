import { Unit } from "../../model/unit.model.js";
import { uploadFile } from "../../service/fileService.js";
export async function upload(req, res) {
  try {
    //console.log("uploading file")
    const folder = await Unit.findById(req.params.unitId);
    if (!folder) {
      return res.status(404).json({ error: "Class not found" });
    }
    const fileId = await uploadFile(req.file, folder.folderId);
    //console.log("file uploaded")
    res.status(200).json({
      message: "File Successfully Added",
      folderId: folder.folderId,
      fileId: fileId,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
