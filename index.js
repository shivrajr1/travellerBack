require('dotenv').config();
const express=require("express");
const cors=require("cors")
const path = require('path');
const mongoose=require("mongoose");
const User=require("./modules/users");
const session=require('express-session');
const MongoStore=require("connect-mongo");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const listRoute=require('./routers/listroute');
const reviewRoute=require('./routers/reviewroute');
const userRoute=require('./routers/userroute');



const main =async()=>{await mongoose.connect(process.env.database_Url);}
  main()
  .then(() => console.log('Connected!'))
  .catch((err)=>{
    console.log(err)
  });

const app=express();
app.use(cors({
  origin: process.env.front_url,
  methods: "GET,PUT,POST,DELETE",
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const store=MongoStore.create({
  mongoUrl:process.env.database_Url,
  crypto:{
    secret:process.env.secret
  },
  touchAfter:24*3600,
})
store.on("error",()=>{
  console.log("mongo session error",err) 
})


app.use(session({
  store,
  secret:process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge:7*24*3600*1000,
    httpOnly:true,
    // secure:true
  }
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/list',listRoute)//multipart
app.use('/api/',userRoute)// json
app.use('/api/list/:id/review',reviewRoute)//json

app.all("*",(req,res)=>{
  res.status(404).send("page not found.")
})
app.use((err,req,res,next)=>{
  const {status=500,message="something went wrong."}=err;
  res.status(status).json(message);
})
app.listen(process.env.port,()=>{
    console.log("server listening..");
})