const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const storeSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'please add a stroe id'],
        unique: true,
        trim: true,
        maxlength: [10, 'store id must be less than 10 chars']
    },
    address: {
        type: String,
        required: [true, 'please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: ['Number'],
            index: '2dsphere'
        },
        formattedAddress: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
});

storeSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    this.address = undefined;
    next();
});

module.exports = mongoose.model('store', storeSchema);

