const app =require('./app.js');
const dotenv=require('dotenv');
const connectDatabase=require('./config/db');

dotenv.config({path:'./config/config.env'}); 
connectDatabase();

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is running on port ${process.env.PORT} in  ${process.env.NODE_ENV} mode` );
} )