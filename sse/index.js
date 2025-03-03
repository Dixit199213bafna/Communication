import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const app = express();

let data = 'Initial Data';


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Cache-Control', 'no-cache');

    res.write('data: Welcome to SSE events \n\n');


    const interval = setInterval(() => {
        res.write(`data: Server started at ${new Date().toUTCString()} \n\n`);
    }, 5000)

    req.on('close', () => {
        clearInterval(interval);
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