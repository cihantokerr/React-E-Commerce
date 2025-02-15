import { useState } from "react";

export default function ChangePassword(){

    var[Password,setPassword]=useState("");
    var[OldPassword,setOldPassword]=useState("");

    //Getting session for security;If there is no session;Re-direct user to homepage
    /*useEffect(()=>{
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
    },[]);*/


    return(
        <>
            asdasd
        </>
    )
}