import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar";
import './style/search-page.css'
import ProductCard from '../components/ProductCard';
import axios from "axios";
import { useEffect,useState } from "react";

export default function SearchPage(){

    var {search_text}=useParams();

    //Getting the products according to the search_text

    var[ProductIDs,setProductIDs]=useState([""]);
    var[ProductNames,setProductNames]=useState([""]);
    var[ProductPrices,setProductPrices]=useState([""]);
    var[ProductDiscountPercentage,setProductDiscountPercentage]=useState([""]);

    useEffect(()=>{
        axios.get("http://localhost:3000/SearchPage/GetProducts",{
            headers: {
                'Content-Type': 'application/json'
            },
            params:{
                search_text_value:search_text
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
    },[search_text]);

    return(
        <>
            <NavBar/>

            <div id="search-page-header" className="container-fluid px-5">
                <h1>Searching Results For</h1>
                <h1 style={{color:"#5610DE"}}>"{search_text}"</h1>
            </div>

            <br /><br />

            <div id="products-container" className="container-fluid p-0 m-0 d-flex justify-content-start align-items-center flex-wrap flex-row row-gap-1 column-gap-0">
                {
                    //Displaying the products
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