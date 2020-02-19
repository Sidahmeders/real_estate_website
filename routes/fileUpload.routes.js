const express = require('express');
const fs = require('fs');
const path = require('path');


const router = express.Router();

router.post('/', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: "no file was uploaded"});
    }

    const {imgFile} = req.files;
    const userInfo = {...req.body, imgPath: `/uploads/housesImg/${imgFile.name}`}
    
    imgFile.mv(`${__dirname}/../client/public/uploads/housesImg/${imgFile.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.status(200).json(userInfo);
    });

    const data = fs.readFileSync(path.join(`${__dirname}/../client/public/uploads`, 'usersInfo.json'), 'utf8', (err, data) => {
        if(err) throw err;
        console.log(data);
    });

    const jsonData = JSON.parse(data);

    jsonData.push(userInfo);

    fs.writeFile(path.join(`${__dirname}/../client/public`, '/uploads', 'usersInfo.json'), JSON.stringify(jsonData), err => {
        if(err) throw err;
        console.log('userInfo file saved..');
    });

});

module.exports = router;
