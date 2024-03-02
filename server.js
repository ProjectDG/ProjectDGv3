const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to read JSON file
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading JSON file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to write JSON file
app.put('/data', (req, res) => {
    const jsonData = req.body;
    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing JSON file');
            return;
        }
        res.send('JSON file updated successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
