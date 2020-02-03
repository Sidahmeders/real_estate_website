const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/userLocation', require('./routes/userLoc.routes'));


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`listening on port ${port}`));
