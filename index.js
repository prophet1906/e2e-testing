const express = require('express');
const app = express();
const port = 4004;

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`OpenAPI specs with swagger served at http://localhost:4004/`);
});