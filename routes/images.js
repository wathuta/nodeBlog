const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})
const upload = multer({
    storage: storage
})
router.post('/', upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded")
});

module.exports = router;