const PORT = 8000;
const express = require('express');
const app = express();
const router = require('./controller/appController');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//set the route of the API
app.use('/', router);
app.use('/produts', router);
app.use('/products/create',router);
app.use('/products/:id/update_quantity',router);
app.use('/products/:id', router);


app.listen(PORT, ()=>{console.log("connected to server : "+ PORT) });