import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

function fileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (
    file.fieldname === "audio" &&
    file.mimetype.startsWith("audio/")
  ) {
    return cb(null, true);
  }

  if (
    file.fieldname === "chart" &&
    file.mimetype === "application/json"
  ) {
    return cb(null, true);
  }

  cb(new Error("Invalid file type"));
}

export const uploadSongFiles = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
}).fields([
  { name: "audio", maxCount: 1 },
  { name: "chart", maxCount: 1 },
]);
