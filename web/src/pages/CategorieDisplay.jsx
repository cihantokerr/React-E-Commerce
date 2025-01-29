import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import './style/categorie-display.css'
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CategorieDisplay(){

    var {categorie}=useParams();


    //Getting the products of the categorie

    var[ProductIDs,setProductIDs]=useState([""]);
    var[ProductNames,setProductNames]=useState([""]);
    var[ProductPrices,setProductPrices]=useState([""]);
    var[ProductDiscountPercentage,setProductDiscountPercentage]=useState([""]);

    useEffect(()=>{
        axios.get("http://localhost:3000/CategorieDisplay/GetProducts",{
            headers: {
                'Content-Type': 'application/json'
            },
            params:{
                product_categorie:categorie
            },
            withCredentials: true
        })
        .then(Response=>{

            //Splitting the product information into arrays
            setProductIDs(JSON.stringify(Response.data.product_ids).slice(1,-1).split(","));
            setProductNames(JSON.stringify(Response.data.product_names).slice(1,-1).split(","));
            setProductPrices(JSON.stringify(Response.data.product_prices).slice(1,-1).split(","));
            setProductDiscountPercentage(JSON.stringify(Response.data.discount_percentages).slice(1,-1).split(","));
        })
    },[]);

    return(
        <>
            <NavBar/>

            <div id='categorie-header' className='container-fluid px-5'>
                <h1>All Products Categorized As</h1>
                <h1 style={{color:"#5610DE"}}>"{categorie}"</h1>
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