const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const url = "mongodb://localhost:27017/excelToJson";
const port = process.env.port || 8087;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/v1', router);

mongoose.connect(url, {
    useNewUrlParser: true
}, () => {
    console.log("Connected to DB!");
});

app.listen(port, () => {
    console.log(`Server is starting at ${port}
    http://localhost:${port}/api/v1/`);
})