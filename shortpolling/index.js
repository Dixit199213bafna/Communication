import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const app = express();

let data = 'Initial Data';


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getData', (req, res) => {
    res.send({
        data
    })
});

app.get('/updateData', (req, res) => {
    data = 'Update Data';
    res.send({
        data
    })
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})