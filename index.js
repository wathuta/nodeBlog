const express =require('express');
const app =express();
const dotenv =require('dotenv');
const mongoose=require('mongoose');
const authentication =require('../api/routes/auth');
const userRoute =require('../api/routes/user');
const PostRoute =require('../api/routes/post');
const CatRoute =require('../api/routes/category');
const ImageRoute = require('../api/routes/images');
app.use(express.json())

dotenv.config();
mongoose.connect(process.env.MONGO,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("connected to mongo")).catch((err)=>console.log(err));


app.use('/api/auth/',authentication)
app.use('/api/user/',userRoute)
app.use('/api/post/',PostRoute)
app.use('/api/cat/',CatRoute)
app.use('/api/upload/',ImageRoute)

app.listen(5000,()=>{console.log("listening on port 5000");})