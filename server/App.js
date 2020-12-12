const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config'); //require('dotenv').config();

const checkAuth = require('./middlewares/check-auth');

mongoose.connect(config.mongodb.connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/videos/*', (req, res, nxt) => {
    res.sendFile(((req.params[0] || '').slice(0, req.params[0].length - 1) || ''), {
        root: path.join(__dirname, 'media/uploads'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    });
});
app.use('/api/videos', express.static(path.join(__dirname, 'media/uploads/')));



//Routes
app.use('/api/signUp', require('./router/signUp'));
app.use('/api/signIn', require('./router/signIn'));
app.use('/api/upload', checkAuth, require('./router/upload'));
app.use('/api/videoList', checkAuth, require('./router/videoList'));

app.use((err, req, res, next) => {
    console.error(`HTTP Request Error: ${err}`);
});

module.exports = app;
