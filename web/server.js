import session from 'express-session';
import express from 'express';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';
import jwt from  'jsonwebtoken';
import env from 'dotenv'
import { HashData } from './Encryption.js';

const app=express();

app.use(cors({
    origin: process.env.FRONTEND_LINK,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
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


app.get("/Homepage/GetProductsOnDiscount",function(req,res){

    //Getting 3 products on discount
    server.query("SELECT GROUP_CONCAT(product_id) as product_ids,GROUP_CONCAT(name) product_names,GROUP_CONCAT(price) as product_prices,GROUP_CONCAT(discount_percentage) as discount_percentages FROM products WHERE discount_percentage!=0.00 LIMIT 3"
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



app.post("/Register-Login/Login",function(req,res){

    var EmailValue=req.body.email_value;
    var PasswordValue=req.body.password_value;

    //Getting the count of the users
    server.query("SELECT COUNT(*) FROM users WHERE email=? AND password=?",[EmailValue,PasswordValue],function(error,result,fields){
        if(error){
            throw error;
        }
        else{
            var UserCount=result[0]['COUNT(*)'];

            if(UserCount==1){
                //Get userID and store it into a session
                server.query("SELECT user_id FROM users WHERE email=?",[EmailValue],function(error,result,fields){
                    if(error){
                        throw error;
                    }
                    else{

                        var UserID=result[0].user_id;
                        
                        const token = jwt.sign({userId:encrypt(UserID)}, 'secret_key', { expiresIn: '1h'});

                        const decoded = jwt.verify(token, "secret_key");
                        const decryptedUserId = decrypt(decoded.userId);
                        
                        console.log("Decrypted:"+decryptedUserId);
                        

                        res.cookie("token", token, {
                            httpOnly: true, // Prevent access from JS (important for security)
                            secure: false, // Change to `true` in production with HTTPS
                            sameSite: "lax"
                        });

                        //Send UserCount to the client
                        res.json({user_count:UserCount});
                    }
                });
                
            }

            else{

                res.json({user_count:UserCount});
            }

        }
    });
    
});


app.post("/Register-Login/Register",function(req,res){

    var User=req.body.register_values;
    

    //Getting the user count for the same phone number
   server.query("SELECT COUNT(*) FROM users WHERE phone_number=?",[User.phone_number],function(error,result,fields){
        if(error){
            throw error;
        }
        else{
            var PhoneCount=result[0]['COUNT(*)'];

            //Getting the user count for same phone number
            server.query("SELECT COUNT(*) FROM users WHERE email=?",[User.email],function(error,result,fields){
                if(error){
                    throw error;
                }
                else{

                    var EmailCount=result[0]['COUNT(*)'];

                    //Register the user if there is no same email or phone number
                    server.query();
                    

                    //Sending data to the client
                    res.json({email_count:EmailCount,phone_count:PhoneCount});
                }
            });
        }
   });
    
    
});



app.post("/GetSession",function(req,res){

    console.log("Hashed data:"+HashData("cihantoker"));
    

    var token=req.cookies.token;
    
    if(token){
        res.json({has_user_logined:true});
    }
    else{
        res.json({has_user_logined:false});
    }
});



app.get("/After-Login/GetProducts",function(req,res){
    

    //Getting the products
    server.query("SELECT GROUP_CONCAT(product_id) AS product_ids, GROUP_CONCAT(name) AS product_names, GROUP_CONCAT(price) AS product_prices, GROUP_CONCAT(discount_percentage) AS discount_percentages FROM products"
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



app.listen(3000,function(){

    console.log("Server is working...");
    
});