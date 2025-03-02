import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const app = express();

let data = 'Initial Data';

const waitListClients = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getData', (req, res) => {
   if (data !== req.query.lastData) {
       res.json({ data})
   } else {
       waitListClients.push(res);
   }
});

app.get('/updateData', (req, res) => {
    data = 'Update Data';
    while (waitListClients.length > 0) {
        const client = waitListClients.pop();
        client.json({ data });
    }
    res.send({
        message: 'Update Data',
    })
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})