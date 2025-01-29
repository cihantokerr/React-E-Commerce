import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../components/NavBar';
import './style/homepage.css'
import SeasonalSelectionSweater from  '../assets/homepage/SeasonalSelectionSweater.png';
import SeasonalSelectionJackets from  '../assets/homepage/SeasonalSelectionJackets.png';
import SeasonalSelectionShirts from  '../assets/homepage/SeasonalSelectionShirts.png';
import Banner1 from  '../assets/homepage/Banner1.png';
import Banner2 from  '../assets/homepage/Banner2.png';
import Banner3 from  '../assets/homepage/Banner3.png';
import {Truck,Box,CashCoin} from 'react-bootstrap-icons'
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Homepage(){

    //Getting product information for on discount section
    var[ProductNames,setProductNames]=useState([""]);
    var[ProductPrices,setProductPrices]=useState([""]);
    var[ProductDiscountPercentage,setProductDiscountPercentage]=useState([""]);
    var[ProductIDs,setProductIDs]=useState([""]);

    useEffect(()=>{
        axios.get("http://localhost:3000/Homepage/GetProductsOnDiscount",{
            headers: {
                'Content-Type': 'application/json'
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
    },[]);

    return(
        <>
            <NavBar/>

            <br /><br /><br />

            {
                //If session is empty;It will take user to the login page``
            }

            <div style={{backgroundImage:`url(${Banner1})`}}  className='container-fluid' id='banner'>a</div>

            <br /><br /><br /><br /><br />
            <h1 id='homepage-header'>Check Out On Seasonal Products</h1>

            <br /><br /><br />

            <div id="homepage-seasonal-product-selection" className='container-fluid d-flex justify-content-center align-items-center flex-row gap-5'>

                <div id="body" className='container border p-0 m-0'>
                    <a href="/Seasonal-Products/Sweater" id='link'>
                        <div style={{backgroundImage:`url(${SeasonalSelectionSweater})`}} id="photo" className='container-fluid p-0 m-0'>
                            <p>Sweaters</p>
                        </div>
                    </a>

                </div>


                <div id="body" className='container border p-0 m-0'>
                    <a href="/Seasonal-Products/Jacket" id='link'>
                        <div style={{backgroundImage:`url(${SeasonalSelectionJackets})`}} id="photo" className='container-fluid p-0 m-0'>
                            <p>Jackets</p>
                        </div>
                    </a>
                </div>


                <div id="body" className='container border p-0 m-0'>
                    <a href="/Seasonal-Products/Shirt" id='link'>
                        <div style={{backgroundImage:`url(${SeasonalSelectionShirts})`}} id="photo" className='container-fluid p-0 m-0'>
                            <p>Shirts</p>
                        </div>
                    </a>
                </div>
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            {
                //If session is empty;It will take user to the login page
            }
            <a href="#" id="banner">
                <div style={{backgroundImage:`url(${Banner2})`}}  className='container-fluid' id='banner'></div>
            </a>




            <br /><br/> 

            <a href="#" id="banner">
                <div style={{backgroundImage:`url(${Banner3})`}}  className='container-fluid' id='banner'></div>
            </a>

            <br /><br /><br /><br /><br /><br />
            
            <h1 id='homepage-header'>On Discount</h1>


            <div id="discounted-products-div" className="container-fluid d-flex justify-content-around align-items-center pt-5">
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

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            <div id="homepage-advertisement-div" className="container-fluid d-flex justify-content-around align-items-center">
                
                <div id="cell" className='container d-flex justify-content-center align-items-center flex-column gap-5'>
                    <Box id='icon' color='#5610DE'/>
                    <p>Good-Quality Products</p>
                </div>

                <div id="cell" className='container d-flex justify-content-center align-items-center flex-column gap-5'>
                    <CashCoin id='icon' color='#5610DE'/>
                    <p>On-Door Payment Option</p>
                </div>

                <div id="cell" className='container d-flex justify-content-center align-items-center flex-column gap-5'>
                    <Truck id='icon' color='#5610DE'/>
                    <p>Safe Cargo</p>
                </div>
            </div>

            <Footer/>
            
        </>
    )
}