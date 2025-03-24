import axios from "axios";
import { useState,useEffect } from "react";
import './style/change-email.css'

export default function ChangePassword(){

    var[Password,setPassword]=useState("");
    var[OldPassword,setOldPassword]=useState("");

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

    function ChangePassword(e){

        e.preventDefault();

        axios.post("http://localhost:3000/User-Profile/ChangeUserPassword",{old_password_value:OldPassword,new_password_value:Password},{withCredentials:true})

        .then((Response)=>{
            
            var OldAndDatabasePasswordsmatch=Response.data.old_and_db_password_match ||true;

            //Change the passwords if both values match;Display an error if they don't
            if(OldAndDatabasePasswordsmatch){
                alert("Password Changed Successfully! Now You Are Going Back To The Login Page...");
                window.location.href="/Login-Register";
            }

            else{
                alert("You Did Not Enter Your Current Password Correctly!");
            }
        });
    }

    return(
        <>
            <div id="change-email-body" className='container-fluid'>
                <br /><br /><br />

                <h1 id="header" className='text-center'>Change Your Password</h1>

                <form onSubmit={ChangePassword} className='d-flex justify-content-center align-items-center flex-column pt-5'>
                    <div id='form-group' className="form-group w-50">
                        <label htmlFor="exampleInputEmail1">New Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} required type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <br />
                        <br />
                    </div>
                    <div id='form-group' className="form-group w-50">
                        <label htmlFor="exampleInputPassword1">Current Password</label>
                        <input onChange={(e)=>{setOldPassword(e.target.value)}} required type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <br />
                    <br />
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </form>

                <div className={"container-fluid"}></div>
            </div>
        </>
    )
}