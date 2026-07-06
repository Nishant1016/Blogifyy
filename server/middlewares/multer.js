import multer from "multer";

const upload = multer({Storage: multer.diskStorage({})})

export default upload;