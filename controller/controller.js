const model = require('../models/models');
const multer = require('multer');
const path = require('path');
const maxSize = 2 * 1000 * 1000;
const xlsToJson = require('xls-to-json-lc');
const xlsxToJson = require('xlsx-to-json-lc');
let fileName = '';

//set destination storage
const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './public/uploads');
    // },
    destination: './public/uploads',
    filename: (req, file, cb) => {
        // console.log("file: ", file);
        fileName += file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
});

//Init upload for single excel sheet
const upload = multer({
    storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
        let extName = path.extname(file.originalname);
        if (extName === ".xlsx" || extName === ".xls") {
            cb(null, true);
        } else {
            cb(new Error('Oops! Sorry, only xlsx and xls file format allowed'));
        }
    }
}).single('excelSheet');

//excel sheet upload
const excelSheetUpload = (req, res, next) => {
    console.log("Excel Sheet Upload API called!");
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({
                success: false,
                message: 'ERROR!!',
                data: err
            })
        }
        xlsxToJson({
            input: `./public/uploads/${fileName}`,
            output: "./public/output.json",
            sheet: "Sheet1",
        }, async (err, jsonResult) => {
            if (err) {
                console.log("err: ", err);
            }
            const result = await model.insertMany(jsonResult);
            if (result) {
                return res.json({
                    success: true,
                    message: 'Data Uploaded to Database',
                    data: result
                })
            }
            return res.json({
                success: false,
                message: 'Oops! Error Occured!',
                data: err
            })
        })
    })

}
module.exports = {
    excelSheetUpload
}