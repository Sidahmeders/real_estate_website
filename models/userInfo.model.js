const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    binaryImgFile: {
        type: Buffer,
        contentType: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10
    }
});

const UsersInfo = mongoose.model('usersInfo', userInfoSchema);

module.exports = UsersInfo;
