const express = require('express');
const bodyParser=require('body-parser');
const errorMiddleware=require('./middlewares/errors')
const app= express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);

const auth=require('./routes/auth');
const event=require('./routes/event');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/v1',auth);
app.use('/api/v1',event);


module.exports = app;