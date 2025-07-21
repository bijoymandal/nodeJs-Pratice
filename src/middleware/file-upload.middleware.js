import multer from "multer";
import fs from "fs";
import path from "path";

const imageDirectory = path.join("public", "images");
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    //ensure the directory exists
    if (!fs.existsSync(imageDirectory)) {
      fs.mkdirSync(imageDirectory, { recursive: true });
    }
    //set the destination for uploaded files
    cb(null, imageDirectory);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});
