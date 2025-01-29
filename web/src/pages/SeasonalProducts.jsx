import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar";
import './style/seasonal-products.css';
import { useState,useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function SeasonalProducts(){

    var {cloth_type}=useParams();

    //Getting the products with cloth_type

    var[ProductIDs,setProductIDs]=useState([""]);
    var[ProductNames,setProductNames]=useState([""]);
    var[ProductPrices,setProductPrices]=useState([""]);
    var[ProductDiscountPercentage,setProductDiscountPercentage]=useState([""]);

    useEffect(()=>{

        axios.get("http://localhost:3000/SeasonalProducts/GetProducts",{
            headers: {
                'Content-Type': 'application/json'
            },
            params:{
                cloth_type_value:cloth_type
            },
            withCredentials: true
        })

        .then(Response=>{
            //Splitting the product information into arrays
            setProductIDs(JSON.stringify(Response.data.product_ids).slice(1,-1).split(","));
            setProductNames(JSON.stringify(Response.data.product_names).slice(1,-1).split(","));
            setProductPrices(JSON.stringify(Response.data.product_prices).slice(1,-1).split(","));
            setProductDiscountPercentage(JSON.stringify(Response.data.discount_percentages).slice(1,-1).split(","));
        });
        
    },[cloth_type]);

    return(
        <>
            <NavBar/>

            <div id='seasonal-products-header' className='container-fluid px-5'>
                <h1>All Products Categorized As</h1>
                <h1 style={{color:"#5610DE"}}>"{cloth_type}s"</h1>
            </div>


            
            <div id="products-container" className="container-fluid p-0 m-0 border d-flex justify-content-start align-items-center flex-wrap flex-row row-gap-1 column-gap-0">
                {
                    ProductIDs.map((item,index)=>{

                        return(
                            <>
                                <ProductCard ProductID={item} ProductName={ProductNames[index]} ProductPrice={ProductPrices[index]} DiscountPercentage={ProductDiscountPercentage[index]}/>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}