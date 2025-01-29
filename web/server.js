import session from 'express-session';
import express from 'express';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';
import jwt, { decode } from 'jsonwebtoken';

const app=express();

app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(express.json());

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
    database:"ecommercedatabase"
});


server.connect();


app.set('trust proxy', 1);


app.get("/CategorieDisplay/GetProducts",function(req,res){

    var categorie=req.query.product_categorie;

    //Getting the products from database with the categorie(ID,name,price,discountpercentage)
    server.query(`SELECT GROUP_CONCAT(product_id) as product_ids,GROUP_CONCAT(name) product_names,GROUP_CONCAT(price) as product_prices,GROUP_CONCAT(discount_percentage) as discount_percentages from products WHERE category='${categorie}'`
        ,function(error,result,fields){
            if(error){
                throw error;
            }
            else{

                var ProductIDs=result[0].product_ids;
                var ProductNames=result[0].product_names;
                var ProductPrices=result[0].product_prices;
                var DiscountPercentages=result[0].discount_percentages;

                //Sending data to the client
                res.json({product_ids:ProductIDs,product_names:ProductNames,product_prices:ProductPrices,discount_percentages:DiscountPercentages});
            }
        }
    );
    
    
});


app.get("/SearchPage/GetProducts",function(req,res){

    var SearchText=req.query.search_text_value;

    //Getting the products according to name,ID,category and cloth type
    server.query(`SELECT GROUP_CONCAT(product_id) AS product_ids, GROUP_CONCAT(name) AS product_names, GROUP_CONCAT(price) AS product_prices, GROUP_CONCAT(discount_percentage) AS discount_percentages FROM products WHERE name LIKE '%${SearchText}%' OR category LIKE '%${SearchText}%' OR cloth_type LIKE '%${SearchText}%'`
        ,function(error,result,fields){
            if(error){
                throw error;
            }
            else{
                var ProductIDs=result[0].product_ids;
                var ProductNames=result[0].product_names;
                var ProductPrices=result[0].product_prices;
                var DiscountPercentages=result[0].discount_percentages;
                
                //Sending data to the client
                res.json({product_ids:ProductIDs,product_names:ProductNames,product_prices:ProductPrices,discount_percentages:DiscountPercentages});
            }
        }
    )   
    
});


app.get("/SeasonalProducts/GetProducts",function(req,res){
    
    var ClothType=req.query.cloth_type_value;

    //Getting the products according to name,ID,category and cloth type
    server.query(`SELECT GROUP_CONCAT(product_id) as product_ids,GROUP_CONCAT(name) product_names,GROUP_CONCAT(price) as product_prices,GROUP_CONCAT(discount_percentage) as discount_percentages from products WHERE cloth_type='${ClothType}'`,
        function(error,result,fields){
            if(error){
                throw error;
            }
            else{
                var ProductIDs=result[0].product_ids;
                var ProductNames=result[0].product_names;
                var ProductPrices=result[0].product_prices;
                var DiscountPercentages=result[0].discount_percentages;
                
                //Sending data to the client
                res.json({product_ids:ProductIDs,product_names:ProductNames,product_prices:ProductPrices,discount_percentages:DiscountPercentages});
            }
        }
    );
});

app.listen(3000,function(){

    console.log("Server is working...");
    
});