const express = require('express');
const unirest = require('unirest');

const router = express.Router();


router.get('/', (req, res) => {

    const apiCall = unirest(
        "GET",
        "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
        );
        apiCall.headers({
        "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "x-rapidapi-key": "8937b09d08mshdfbd6ae276cfb0dp1cfad9jsnbdc8f37bf803"
        });
        apiCall.end(function(result) {
        if (res.error) throw new Error(result.error);
        res.send(result.body);
    });
});


module.exports = router;
