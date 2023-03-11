const express = require('express');
const bodyParser=require('body-parser');
const errorMiddleware=require('./middlewares/errors')
const app= express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);

const auth=require('./routes/auth');
const event=require('./routes/event');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(auth);
app.use(event);


app.use("/event", require("./routes/event"));


module.exports = app;