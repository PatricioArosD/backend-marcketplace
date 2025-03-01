const express = require('express');
const app = express();  
const port = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./src/routes/index');

app.use(cors());
app.use(express.json());
app.use("/", routes());

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
