import { useState } from 'react'
import NavBar from '../components/NavBar'
import './style/login-register.css'
import axios from 'axios';

export default function LoginRegister(){

    var[IsLoginOnDisplay,setIsLoginOnDisplay]=useState(true);
    var[HashedData,setHashedData]=useState("");
    var[DataComparison,setDataComparison]=useState(false);



    var[Register,setRegister]=useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        phone_number:"",
        address:"",
        address_2:"",
        city:"",
        zip_code:"",
        gender:"",
        date_of_birth:"",
    });


    var[User,setUser]=useState({
        email:'',
        password:''
    });
  

    //If login form is not opened;Open login form
    function DisplayLoginForm(){
        if(!IsLoginOnDisplay){
            setIsLoginOnDisplay(true);
        }
    }


    //If register form is not opened;Open register form
    function DisplayRegisterForm(){
       if(IsLoginOnDisplay){
            setIsLoginOnDisplay(false);
        }
    }


    //Handle Login
    function Login(e){
        
        e.preventDefault()


       axios.post("http://localhost:3000/Register-Login/Login",{
            email_value:User.email,
            password_value:User.password
        },{withCredentials:true})

        .then((Response)=>{
            
            var IsUserFound=Response.data.is_user_found;
            
            if(IsUserFound){
                window.location.href="/After-Login";
            }

            else{
                alert("No user is found with the given information");
            }
        });
    }


    function RegisterFunc(e){

        e.preventDefault();
        axios.post("http://localhost:3000/Register-Login/Register",{register_values:Register},{withCredentials:true})

        .then((Response)=>{
            
            var PhoneCount=Response.data.phone_count;
            var EmailCount=Response.data.email_count;

            //If there is a user with the inputted email;Dİsplay an alert
            if(EmailCount==1){
                alert("There is a user with the given email.");
            }


            //If there is a user with the inputted phone number;Dİsplay an alert
            if(PhoneCount==1){
                alert("There is a user with the given phone number.");
            }


            //If there is no user with the given phone number nor email;Register the user
            if(PhoneCount==0 && EmailCount==0){
                alert("Register successful!");
            }
            
        });

    }

    return(
        <>
            <NavBar/>

            <br /><br /><br /><br /><br />



            <h1 id='login-or-register-text'>
                {
                    IsLoginOnDisplay ? 'Login To Your Account' :'Register'
                }
            </h1>

            <br />

            <p id='indicator-text'>

                {
                    IsLoginOnDisplay ? 'We were waiting for you..' :'Welcome Aboard!'
                }
            </p>

            <br /><br />


            <div id="login-form" className={IsLoginOnDisplay ? "container pt-0 d-flex justify-content-center align-items-center border":"container pt-0 d-none justify-content-center align-items-center border"}>


                <form onSubmit={Login} className='d-flex justify-content-center align-items-center flex-column'>

                    <div class="form-group pt-0">
                    
                        <input onChange={(e) => setUser(prevState => ({ ...prevState, email: e.target.value }))} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>setUser(prev=>({...prev,password:e.target.value}))} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    

                    <div id="email-verification" className="container-fluid pt-2">
                        <a href="">Having Trouble On Login ?</a>
                    </div>

                    <br /><br />
                        <button type="submit" class="btn btn-primary">Log In</button>
                    <br /><br />

                    <p onClick={DisplayRegisterForm} id="register-text">Click Here To Register</p>

                    <p style={{fontSize:"0.7rem"}}>Google and apple login will be added here.</p>
                </form>
            </div>


            {
                //Register Page

            }

            
            <div className={IsLoginOnDisplay ? "container pt-5 d-none flex-wrap justify-content-center align-items-center border":"container pt-5 d-flex flex-wrap justify-content-center align-items-center border"} id="login-form">


                <form onSubmit={RegisterFunc} className='d-flex justify-content-center align-items-center flex-column'>

                    <div class="form-group pt-0">
                    
                        <input onChange={(e) => setRegister(prevState => ({ ...prevState, first_name: e.target.value }))} type="text" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter First Name"/>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>setRegister(prev=>({...prev,last_name:e.target.value}))} type="text" required class="form-control" id="exampleInputPassword1" placeholder="Enter Last Name"/>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>setRegister(prev=>({...prev,email:e.target.value}))} type="email" required class="form-control" id="exampleInputPassword1" placeholder="Enter Email"/>
                    </div>
                    

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>setRegister(prev=>({...prev,phone_number:e.target.value}))} type="tel" required  class="form-control" id="exampleInputPassword1" placeholder="Enter Phone Number"/>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>setRegister(prev=>({...prev,password:e.target.value}))} type="password" required class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                    </div>

        

                    <br /><br />
                    <div class="form-group">
                        <textarea onChange={(e)=>setRegister(prev=>({...prev,address:e.target.value}))} placeholder='Enter Address 1' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <textarea onChange={(e)=>setRegister(prev=>({...prev,address_2:e.target.value}))} placeholder='Enter Address 2' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>setRegister(prev=>({...prev,zip_code:e.target.value}))} type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter ZIP Code"/>
                    </div>

                    <br /><br />
                    <div className="form-group">
                        <select onChange={(e)=>setRegister(prev=>({...prev,gender:e.target.value}))} className="form-control">
                            <option value={"M"}>M</option>
                            <option value={"F"}>F</option>
                        </select>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>setRegister(prev=>({...prev,date_of_birth:(e.target.value).toString()}))} type="date" class="form-control" id="exampleInputPassword1" placeholder="Enter Date Of Birth"/>
                    </div>

                    <br /><br />
                        <button type="submit" class="btn btn-primary">Register</button>
                    <br /><br />

                    <p onClick={DisplayLoginForm} id="register-text">Click Here To Login</p>

                    <p style={{fontSize:"0.7rem"}}>Google and apple login will be added here.</p>
                </form>
            </div>
        </>
    )
}