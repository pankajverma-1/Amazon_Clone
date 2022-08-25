require('dotenv').config();
require('./db/conn');
const express = require('express');
const Router = require('./models/Routers');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
) {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}
app.use('/api', Router);

app.listen(port, () => console.log(`app run port ${port}`));