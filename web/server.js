import session from 'express-session';
import express from 'express';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';
import jwt from  'jsonwebtoken';
import { CompareHash, decryptAES, encryptAES, hashedValue } from './Encryption.js'

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

                    var UserID=result[0].user_id;
                    
                    var token=jwt.sign({user_id:encryptAES(UserID)},'secret_key',{expiresIn:"1h"});//!Change the secret key after production
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


app.post("/User-Profile/GetUserInformation",function(req,res){

    var token=req.cookies.token;

    var IDSession=jwt.verify(token,"secret_key").user_id;

    //Getting the informations
    server.query("SELECT * FROM users WHERE user_id=?",[decryptAES(IDSession)],function(error,result,fields){
        if(error){
            throw error;
        }
        else{

            //Sending values to the server     

            res.json({
                user_id: result[0].user_id,
                first_name: decryptAES(result[0].first_name),
                last_name: decryptAES(result[0].last_name),
                email: result[0].email,
                password:result[0].password,
                phone_number: decryptAES(result[0].phone_number),
                gender: decryptAES(result[0].gender),
                date_of_birth: decryptAES(result[0].date_of_birth),
                account_created_at: decryptAES(result[0].account_created_at),
                shopping_cart: (result[0].shopping_cart),
            });
            
        }
    });
    
    
});


app.post("/User-Profile/ChangeUserInformation",function(req,res){
    var User=req.body.user_values;    

    var token=req.cookies.token;

    var IDSession=jwt.verify(token,"secret_key").user_id;
    
    console.log(User);
    

    //Getting the phone numbers to check for a duplicate phone number
    server.query("SELECT GROUP_CONCAT(phone_number) as phone_numbers FROM users",function(error,result,fields) {
        if(error){
            throw error;
        }
        else{

            var PhoneNumbers=JSON.stringify(result[0].phone_numbers).split(",");
            var NumberFound=false;//If there is a duplicate phone number;This variable will be set to false
            
            //Checking for the duplicate phone numbers
            for(var i=0;i<PhoneNumbers.length;i++){

                var DecyrptedPhoneNumber=decryptAES(PhoneNumbers[i].slice(1,-1));

                if(DecyrptedPhoneNumber==User.Phone_Number){
                    NumberFound=true
                    break;
                }
            }


            //Sending the value if there is a duplicate
            if(NumberFound){

                res.json({
                    number_found:true
                });
            }

            else{

                //Changing the values in database
                server.query("UPDATE users SET first_name=?,last_name=?,gender=?,phone_number=?,date_of_birth=? WHERE user_id=?",
                    [
                        encryptAES(User.Name),encryptAES(User.Surname),encryptAES(User.Gender),encryptAES(User.Phone_Number),encryptAES(User.Date_Of_Birth),decryptAES(IDSession)
                    ],
                    function(error,result,fields){

                        console.log("User Information Has Changed!");
                        
                    }
                );
            }
            
            

        }
    });
});


app.post("/User-Profile/ChangeUserEmail",function(req,res){

    var Email=req.body.email_value;
    var Password=req.body.password_value;
    var token=req.cookies.token;
    var IDSession=jwt.verify(token,"secret_key").user_id;


    //Checking that inputted email is not used by another user
    server.query("SELECT COUNT(*) FROM users WHERE email=?",[Email],function(error,result,fields){
        if(error){
            throw error;
        }
        else{

            var EmailCount=result[0]['COUNT(*)'];

            if(EmailCount==1){
                res.json({email_count:EmailCount});
            }

            else{
                
                //Getting the password of the user to check that user entered their password correctly
                server.query("SELECT password as database_password FROM users WHERE user_id=?",[decryptAES(IDSession)], async function(error,result,fields){
                    if(error){
                        throw error;
                    }
                    else{

                        var DatabasePassword=result[0].database_password;

                        //Checking that both passwords match
                        var HasPasswordsMatched= await CompareHash(DatabasePassword,Password);

                        console.log(HasPasswordsMatched);
                        

                        if(!HasPasswordsMatched){

                            res.json({has_passwords_matched:false});
                        }

                        else{

                            //Changing the user email
                            server.query("UPDATE users SET email=? WHERE user_id=?",[Email,decryptAES(IDSession)],function(error,result,fields){

                                if(error){
                                    throw error;
                                }
                                else{
                                    res.json({has_email_changed:true});
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});


app.post("/User-Profile/ChangeUserPassword",function(req,res){

    var OldPassword=req.body.old_password_value;
    var NewPassword=req.body.new_password_value;
    var token=req.cookies.token;
    var IDSession=jwt.verify(token,"secret_key").user_id;

    //Getting password from database
    server.query("SELECT password AS database_password FROM users WHERE user_id=?",[decryptAES(IDSession)], async function(error,result,fields){
        if(error){
            throw error;
        }
        else{

            var DatabasePassword=result[0].database_password;
            
            //Comparing the password from the database and old password
            var OldAndDatabasePasswordsmatch=await CompareHash(DatabasePassword,OldPassword);

            //If passwords match;Change the user's password
            if(!OldAndDatabasePasswordsmatch){

                res.json({old_and_db_password_match:false});
            }
            else{

                server.query("UPDATE users SET password=? WHERE user_id=?",[await hashedValue(NewPassword),decryptAES(IDSession)],function(error,result,fields){
                    if(error){
                        throw error;
                    }
                    else{

                        console.log("Password has changed!");
                    }
                });
            }
            
            
        }
    });
});


app.post("/User-Profile/ChangeFinancialInformation",function(req,res){

    var Financial=req.body.financial_values;
    
    var token=req.cookies.token;
    var IDSession=jwt.verify(token,"secret_key").user_id;

    //Updating the values
    server.query("UPDATE users SET card_name=?,card_number=?,card_exp_date=?,CVV=? WHERE user_id=?",[
        encryptAES(Financial.Card_Name),
        encryptAES(Financial.Card_Number),
        encryptAES(Financial.Card_Exp_Date),
        encryptAES(Financial.CVV),
        decryptAES(IDSession)
    ],
    function(error,result,fields){
        if(error){
            throw error;
        }
        else{

            console.log("Financial Informations Has Changed Successfully!");

            res.json(true);
            
        }
    });
});



app.post("/User-Profile/ChangeAddressInformation",function(req,res){

    var Address=req.body.address_values;

    var token=req.cookies.token;
    var IDSession=jwt.verify(token,"secret_key").user_id;

    //Updating the values in database
    server.query("UPDATE users SET address_line_1=?,address_line_2=?,city=?,zip_code=? WHERE user_id=?",
        [
            encryptAES(Address.address),
            encryptAES(Address.address_2),
            encryptAES(Address.City),
            encryptAES(Address.Zip_Code),
            decryptAES(IDSession)
        ],
        function(error,result,fields){

            console.log("Address Updated Successfully!");
            
        }
    );
});


app.listen(3000,function(){

    console.log("Server is working...");
    
});