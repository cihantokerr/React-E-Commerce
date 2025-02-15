import { useEffect, useState } from 'react'
import './style/change-email.css'
import axios from 'axios';

export default function ChangeEmail(){

    var[Email,setEmail]=useState("");
    var[Password,setPassword]=useState("");

    //Getting session for security;If there is no session;Re-direct user to homepage
    useEffect(()=>{
        axios.post("http://localhost:3000/GetSession",{},{
            withCredentials:true
        })

        .then(Response=>{
            //Take user back to the homepage if session is not found
            if(!Response.data.has_user_logined){
                alert("No Session Found.");
                window.location.href="/";
            }
        });        
    },[]);


    function ChangeUserEmail(e){

        e.preventDefault();

        axios.post("http://localhost:3000/User-Profile/ChangeUserEmail",{email_value:Email,password_value:Password},{withCredentials:true})

        .then((Response)=>{

            var EmailCount=Response.data.email_count || 0;//Setting the email count to 0 to define that no user found with the inputted email

            //Displaying an error if user is found
            if(EmailCount==1){

                alert("This email is used by another user.");
            }

            else{

                var HasPasswordsMatched=Response.data.has_passwords_matched || true;

                if(!HasPasswordsMatched){
                    alert("You did not enter your password correctly!");
                }

                else{

                    var HasEmailChanged=Response.data.has_email_changed || false;


                    if(!HasEmailChanged){
                        alert("Email Has Not Changed!");
                    }

                    else{
                        alert("Email Has Been Changed! Now You Are Going Back To Login Page");
                        window.location.href="/Login-Register";
                    }
                }
            }
        });
    }

    return(
        <>
            <div id="change-email-body" className='container-fluid'>
                <br /><br /><br />

                <h1 id="header" className='text-center'>Change Your Email</h1>

                <form onSubmit={ChangeUserEmail} className='d-flex justify-content-center align-items-center flex-column pt-5'>
                    <div id='form-group' class="form-group w-50">
                        <label for="exampleInputEmail1">Email address</label>
                        <input onChange={(e)=>{setEmail(e.target.value)}} required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <br />
                        <br />
                    </div>
                    <div id='form-group' class="form-group w-50">
                        <label for="exampleInputPassword1">Password(For verification)</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} required type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <br />
                    <br />
                    <button type="submit" class="btn btn-primary">Change Email</button>
                </form>
            </div>
        </>
    )
}