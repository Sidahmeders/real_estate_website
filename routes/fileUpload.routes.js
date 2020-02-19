const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: "no file was uploaded"});
    }

    const {imgFile} = req.files;
    const userInfo = {...req.body, imgPath: `/uploads/${imgFile.name}`}
    
    imgFile.mv(`${__dirname}/../client/public/uploads/${imgFile.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.status(200).json(userInfo);
    });

    fs.appendFile(path.join(`${__dirname}/../client/public/`, '/uploads', 'userInfo.json'), JSON.stringify(userInfo), err => {
        if(err) throw err;
        console.log('userInfo file saved..');
    });

});

module.exports = router;
