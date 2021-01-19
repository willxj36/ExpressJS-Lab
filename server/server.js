const express = require('express');
let app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// app.get('/', (req, res) => {
//     res.send('Hello from the server side!');
// });

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.post('/submission', (req, res) => {
    let rawArray = fs.readFileSync('./server/formsubmissions.json');
    let contactsArray = JSON.parse(rawArray);
    let submission = {
        "Name": req.body.name,
        "Phone Number": req.body.phonenumber
    };
    contactsArray.push(submission);
    console.log(contactsArray);
    fs.writeFileSync('./server/formsubmissions.json', JSON.stringify(contactsArray));
    res.send('Form submitted!');
});

app.get('/formsubmissions', (req, res) => {
    let json = fs.readFileSync('./server/formsubmissions.json');
    let result = JSON.parse(json);
    res.send(result);
    }
)

app.listen(3000);