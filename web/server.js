import session from 'express-session';
import express from 'express';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';
import jwt from  'jsonwebtoken';
import { CompareHash, hashedValue } from './Encryption.js'

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
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



app.post("/Register-Login/Login", async function(req,res){

    var EmailValue=req.body.email_value;
    var PasswordValue= req.body.password_value;
    
    

    //Getting the count of the users with the email
    server.query("SELECT COUNT(*) as user_count,email,password,user_id FROM users WHERE email=?",[EmailValue],async function(error,result,fields){
        if(error){
            throw error;
        }
        else{

            var Usercount=result[0].user_count;
        
            //If user is found;Compare the passsword
            if(Usercount==1){

                var DatabasePassword=(result[0].password);


                //Comparing the inputted password and password in the database
                var IsUserFound= await CompareHash(DatabasePassword,PasswordValue);

                //If user is found;Display a message and save user_id as session
                if(IsUserFound){
                   
                    console.log("User is found"); //!Delete this after production

                    var UserID=result[0].user_id;
                    
                    var token=jwt.sign({user_id:UserID},'secret_key',{expiresIn:"1h"});//!Change the secret key after production
                    res.cookie("token",token);

                    res.json({is_user_found:true});
                }

                else{
                    res.json({is_user_found:false});
                }
            }

            else{
                res.json({is_user_found:false});
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
    var token=req.cookies.token;
    
    
    if(token){
        res.json({has_user_logined:true});
    }
    else{
        res.json({has_user_logined:false});
    }
});


app.post("/LogOff",function(req,res){

    var IsCookieCleared=false;

    //Destroying the cookie and sending the success message to the client
    try{
        res.clearCookie("token");
        IsCookieCleared=true;
    }

    catch{
        IsCookieCleared=false;
    }

    res.send({is_cookie_cleared:IsCookieCleared});

});




app.get("/After-Login/GetProducts",function(req,res){

    server.query("SELECT GROUP_CONCAT(product_id) as product_ids,GROUP_CONCAT(name) product_names,GROUP_CONCAT(price) as product_prices,GROUP_CONCAT(discount_percentage) as discount_percentages from products",function(error,result,fields){
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
    });
});



app.get("/After-Login/GetSpesificProducts",function(req,res){

    //Getting the values from the client and putting everything into an array
    var Categories=req.query.Categorie;
    var ClothTypes=req.query.ClothType;

    var CategoriesQueryString="";
    var ClothTypesQueryString="";


    var query="SELECT GROUP_CONCAT(product_id) as product_ids,GROUP_CONCAT(name) product_names,GROUP_CONCAT(price) as product_prices,GROUP_CONCAT(discount_percentage) as discount_percentages from products WHERE "
    
    //If user has selected any categories;Add IN() function on query
    if(Categories.length!=0){

        //Generating the query string
        for(var i=0;i<Categories.length;i++){

            CategoriesQueryString=CategoriesQueryString+`'${Categories[i]}'`

            //Adding the ',' to the string if the system is not on the last loop
            if(i<Categories.length-1){
                CategoriesQueryString=CategoriesQueryString+",";
            }
        }

        query=query+` category IN(${CategoriesQueryString})`;
    }

    if(ClothTypes.length!=0){

        //Generate the query string
        for(var i=0;i<ClothTypes.length;i++){

            ClothTypesQueryString=ClothTypesQueryString+`'${ClothTypes[i]}'`

            //Adding the ',' to the string if the system is not on the last loop
            if(i<ClothTypes.length-1){
                ClothTypesQueryString=ClothTypesQueryString+",";
            }
        }


        //If user has not selected any categories;Add 'AND' attribute on query;If not; Add IN() only
        if(Categories.length!=0){

            query=query+` AND cloth_type IN(${ClothTypesQueryString})`;
        }

        else{

            query=query+` cloth_type IN(${ClothTypesQueryString})`;
        }
    }


    server.query(query,function(error,result,fields){
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
    });
});


app.listen(3000,function(){

    console.log("Server is working...");
    
});