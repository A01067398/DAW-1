const express = require('express');
const router = require('./routes/route');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public/')));

app.use(router); 

app.listen(3000);
