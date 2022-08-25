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

app.use('/api', Router);
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`app run port ${port}`));