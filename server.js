const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(fileUpload());

app.use('/', require('./routes/store.routes'));
app.use('/uploads', require('./routes/fileUpload.routes'));
app.use('/userLocation', require('./routes/userLoc.routes'));


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`listening on port ${port}`));
