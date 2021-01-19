const express = require('express');
let app = express();
const path = require('path');

// app.get('/', (req, res) => {
//     res.send('Hello from the server side!');
// });

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);