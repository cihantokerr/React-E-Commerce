import { useState } from 'react'
import NavBar from '../components/NavBar'
import './style/login-register.css'
import axios from 'axios';


export default function LoginRegister(){

    var[IsLoginOnDisplay,setIsLoginOnDisplay]=useState(true);

    var[user,SetUser]=useState({email:"",password:""});

    <input onChange={(e)=>{SetUser()}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

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
        
        e.preventDefault();

        axios.post("http://localhost:3000/Register-Login/Login",{
            email_value:user.email,
            password_value:user.password
        },{withCredentials:true})

        .then((Response)=>{
            
            var UserCount=Response.data.user_count;

            //If UserCount is 1,Take user to /After-Login
            if(UserCount==1){
                window.location.href="/After-Login";
            }

            else{

                alert("User Is Not Found With Given Information.");
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

            <div style={{display:IsLoginOnDisplay ? 'flex':'none'}} id="login-form" className="container pt-0 d-flex justify-content-center align-items-center border">


                <form onSubmit={Login} className='d-flex justify-content-center align-items-center flex-column'>

                    <div class="form-group pt-0">
                    
                        <input onChange={(e) => SetUser(prevState => ({ ...prevState, email: e.target.value }))} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>

                    <br /><br />
                    <div class="form-group">
                        <input onChange={(e)=>SetUser(prev=>({...prev,password:e.target.value}))} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
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
        </>
    )
}