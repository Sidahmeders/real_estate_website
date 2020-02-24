const express = require('express');
const UserInfo = require('../models/userInfo.model');
const router = express.Router();
const auth = require('../middleware/auth');
// const fs = require('fs');
// const path = require('path');

 
router.post('/', auth, async (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: "no file was uploaded"});
    }

    //! this is for file system storage
    // const {file} = req.files;
    // const userInfo = {...req.body, imgPath: `/uploads/housesImg/${file.name}`}
    
    // imgFile.mv(`${__dirname}/../client/public/uploads/housesImg/${file.name}`, err => {
    //     if(err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }
    //     res.status(200).json(userInfo);
    // });

    // const data = fs.readFileSync(path.join(`${__dirname}/../client/public/uploads`, 'usersInfo.json'), 'utf8', (err, data) => {
    //     if(err) throw err;
    //     console.log(data);
    // });

    // const jsonData = JSON.parse(data);

    // jsonData.push(userInfo);

    // fs.writeFile(path.join(`${__dirname}/../client/public`, '/uploads', 'usersInfo.json'), JSON.stringify(jsonData), err => {
    //     if(err) throw err;
    //     console.log('userInfo file saved..');
    // });

    const { file } = req.files;
    const binaryImgFile = file.data;
    const base64String = new Buffer.from(binaryImgFile).toString('base64');
    const userHouseInfo = {...req.body, binaryImgFile};
    const newUserInfo = new UserInfo(userHouseInfo);

    try {
        await newUserInfo.save();
        res.status(200).json({...req.body, base64String});
        console.log('userInfo saved successfully..');
    } catch(err) {
        if(err) throw err;
        res.status(500).json({msg: "no file was uploaded"});
        console.log(userHouseInfo);
    }

});

router.get('/', async (req, res) => {
    const usersInfo = await UserInfo.find();

    try {
        res.status(200).json({usersInfo: usersInfo});
        console.log('getting usersInfo successfuly');
    } catch(err) {
        if(err) throw err;
        res.status(500).json({msg: "there was a problem getting usersInfo"});
        console.log(usersInfo);
    }
});


module.exports = router;
