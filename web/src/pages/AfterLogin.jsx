import axios from "axios";
import { useEffect, useState} from "react"
import NavBar from '../components/NavBar'
import './style/after-login.css'
import 'bootstrap/dist/css/bootstrap.css';
import Banner1 from  '../assets/homepage/Banner1.png';
import Banner3 from  '../assets/homepage/Banner3.png';
import ProductCard from "../components/ProductCard";

export default function AfterLogin(){

    var[ProductIDs,setProductIDs]=useState([""]);
    var[ProductNames,setProductNames]=useState([""]);
    var[ProductPrices,setProductPrices]=useState([""]);
    var[ProductDiscountPercentage,setProductDiscountPercentage]=useState([""]);
    var[HasAnyCategorieSelected,setHasAnyCategorieSelected]=useState(false);
    var[HasAnyClothTypeSelected,setHasAnyClothTypeSelected]=useState(false);
    
    //These 2 arrays are going to keep the categorie and bring the related products when a categorie or gender is selected
    var[ClothType,setClothType]=useState({
        T_Shirt:false,
        Shirt:false,
        Sweater:false,
        Shoes:false,
        Jacket:false,
        Pants:false,
    });//System is going to get the values which are true(ex:(If T-Shirt,Sweater and M are true;System is going to fetch T-shirts and Sweaters for men))

    var[Categorie,setCategorie]=useState({M:false,F:false,B:false,G:false});


    //*Getting the session and checking it for security
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




    //*Getting the products 
    useEffect(()=>{
        axios.get("http://localhost:3000/After-Login/GetProducts",{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        .then((Response)=>{

            //Splitting the product information into arrays
            setProductIDs(JSON.stringify(Response.data.product_ids).slice(1,-1).split(","));
            setProductNames(JSON.stringify(Response.data.product_names).slice(1,-1).split(","));
            setProductPrices(JSON.stringify(Response.data.product_prices).slice(1,-1).split(","));
            setProductDiscountPercentage(JSON.stringify(Response.data.discount_percentages).slice(1,-1).split(","));
        });
    });



    //*A function to get spesific products
    function GetSpesificProducts(){
        
        /**
         * Check cloth_type and category objects
         * If both of them are empty;Display an alert
         * If not;Send the values to the server and get the values back
         */

    }



    return(
        <>
             <NavBar/>

             <br /><br /><br />
             
             <div style={{backgroundImage:`url(${Banner1})`}}  className='container-fluid' id='banner'></div>



            <br /><br/> 

            <div style={{backgroundImage:`url(${Banner3})`}}   className='container-fluid' id='banner'></div>

            <br /><br /><br /><br /><br />

            <div id="after-login-body" className="container-fluid p-0 m-0 d-flex justify-content-center align-items-center flex-column gap-3">

                 <div id="categorie-selection-bar" className="container-fluid d-flex justify-content-start align-items-start px-3 flex-column gap-4">

                    <h1>Categories</h1>

                    <div id="categories-div" className="container-fluid d-flex justify-content-start align-items-start">

                        <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                            
                            <input onChange={(e)=>{setCategorie(prev => ({ ...prev, M: e.target.checked }))}}  class="form-check-input" type="checkbox" value="Men" id="flexCheckDefault"/>

                            <label class="form-check-label" for="flexCheckDefault">
                                Men
                            </label>
                        </div>

                        <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                            
                            <input onChange={(e)=>{setCategorie(prev=>({...prev,F:e.target.checked}))}}  class="form-check-input" type="checkbox" value="Women" id="flexCheckDefault"/>

                            <label class="form-check-label" for="flexCheckDefault">
                                Women
                            </label>
                        </div>


                        <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                            
                            <input onChange={(e)=> {setCategorie(prev=>({...prev,B:e.target.checked}))}}  class="form-check-input" type="checkbox" value="Boys" id="flexCheckDefault"/>

                            <label class="form-check-label" for="flexCheckDefault">
                                Boys
                            </label>
                        </div>



                        <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                            
                            <input onChange={(e)=>{setCategorie(prev=>({...prev,G:e.target.checked}))}} class="form-check-input" type="checkbox" value="Girls" id="flexCheckDefault"/>

                            <label class="form-check-label" for="flexCheckDefault">
                                Girls
                            </label>
                        </div>
                    </div>
                 </div>

                 <br /><br />

                 <div id="cloth-type-selection-div" className="container-fluid d-flex justify-content-start align-items-start px-3 flex-column gap-4">
                    
                    <h1>Cloth Types</h1>

                        <div id="cloth-types-div" className="container-fluid d-flex justify-content-start align-items-center">

                            <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                                    
                                <input onChange={(e)=>{setClothType(prev=>({...prev,T_Shirt:e.target.checked}))}} class="form-check-input" type="checkbox" value="T-Shirt" id="flexCheckDefault"/>

                                <label class="form-check-label" for="flexCheckDefault">
                                    T-Shirt
                                </label>
                            </div>

                            <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                                    
                                <input onChange={(e)=>{setClothType(prev=>({...prev,Shirt:e.target.checked}))}} class="form-check-input" type="checkbox" value="Shirt" id="flexCheckDefault"/>
    
                                <label class="form-check-label" for="flexCheckDefault">
                                    Shirt
                                </label>
                            </div>


                            <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                                    
                                    <input onChange={(e)=>{setClothType(prev=>({...prev,Sweater:e.target.checked}))}} class="form-check-input" type="checkbox" value="Sweater" id="flexCheckDefault"/>
        
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Sweater
                                    </label>
                            </div>

                            <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                                    
                                <input onChange={(e)=>{setClothType(prev=>({...prev,Shoes:e.target.checked}))}} class="form-check-input" type="checkbox" value="Shoes" id="flexCheckDefault"/>
        
                                <label class="form-check-label" for="flexCheckDefault">
                                    Shoes
                                </label>
                            </div>


                            <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                                    
                                <input onChange={(e)=>{setClothType(prev=>({...prev,Jacket:e.target.checked}))}} class="form-check-input" type="checkbox" value="Jacket" id="flexCheckDefault"/>
            
                                <label class="form-check-label" for="flexCheckDefault">
                                    Jacket
                                </label>
                            </div>


                            <div id="categorie-selection" className="container d-flex justify-content-start align-items-bottom flex-row gap-2">
                                    
                                <input onChange={(e)=>{setClothType(prev=>({...prev,Shoes:e.target.checked}))}} class="form-check-input" type="checkbox" value="Pants" id="flexCheckDefault"/>
                
                                <label class="form-check-label" for="flexCheckDefault">
                                    Pants
                                </label>
                            </div>
                        </div>

                        <div id="search-button-div" className="container-fluid pt-5 d-flex justify-content-center align-items-center">
                            <button onClick={GetSpesificProducts}>asd</button>
                        </div>

                 </div>


                 {
                    //Product displays
                 }

                 <br /><br /><br />

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

            </div>
        </>
    )
}