import session from 'express-session';
import express from 'express';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieSession from 'cookie-session';
const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24,
        httpOnly:true
    }
}));

app.set('trust proxy', 1);


//*Database connection
const server=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ecommercedatabase2"
});


server.connect();


app.set('trust proxy', 1);


app.listen(3000,function(){

    console.log("E commerce On Live!");
    
});