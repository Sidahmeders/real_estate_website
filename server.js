const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(fileUpload());

const uri = process.env.DATABASE_KEY;
mongoose.connect(process.env.MONGODB_URI || uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true }, () => {
    console.log('mongoDB connection is Up and running...')
})
.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

app.use('/', require('./routes/store.routes'));
app.use('/uploads', require('./routes/fileUpload.routes'));
app.use('/userLocation', require('./routes/userLoc.routes'));
app.use('/users', require('./routes/users.routes'));


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
