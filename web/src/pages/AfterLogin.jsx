import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from '../components/NavBar'
import './style/after-login.css'
import 'bootstrap/dist/css/bootstrap.css';
import Banner1 from  '../assets/homepage/Banner1.png';
import Banner3 from  '../assets/homepage/Banner3.png';

export default function AfterLogin(){

    var[ProductIDs,setProductIDs]=useState([""]);
    var[ProductNames,setProductNames]=useState([""]);
    var[ProductPrices,setProductPrices]=useState([""]);
    var[ProductDiscountPercentage,setProductDiscountPercentage]=useState([""]);
    

    //Getting the session and checking it for security
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




    //TODO:Getting the products 
    useEffect(()=>{

        axios.get("http://localhost:3000/After-Login/GetProducts",{
            withCredentials:true
        })

        .then(Response=>{
            //Splitting the product information into arrays
            setProductIDs(JSON.stringify(Response.data.product_ids).slice(1,-1).split(","));
            setProductNames(JSON.stringify(Response.data.product_names).slice(1,-1).split(","));
            setProductPrices(JSON.stringify(Response.data.product_prices).slice(1,-1).split(","));
            setProductDiscountPercentage(JSON.stringify(Response.data.discount_percentages).slice(1,-1).split(","));
        });

    },[]);
    

    return(
        <>
             <NavBar/>

             <br /><br /><br />
             
             <div style={{backgroundImage:`url(${Banner1})`}}  className='container-fluid' id='banner'></div>



            <br /><br/> 

            <div style={{backgroundImage:`url(${Banner3})`}}   className='container-fluid' id='banner'></div>

            <br /><br /><br /><br /><br /><br /><br />

            <div id="after-login-body" className="container-fluid p-0 m-0 border d-flex justify-content-center align-items-center">
            
                 
            </div>
        </>
    )
}