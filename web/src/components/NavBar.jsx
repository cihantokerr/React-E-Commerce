import 'bootstrap/dist/css/bootstrap.css'
import './style/nav-bar.css'
import {Search,Person,Bag,Unlock} from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import ShoppingCartProduct from './ShoppingCartProduct';
import axios from 'axios';

export default function NavBar(){

    var[HasUserLogined,setHasUserLogined]=useState(false);
    var[IsSearchBarOnDisplay,setIsSearchBarOnDisplay]=useState(false);
    var[IsShoppingCartOnDisplay,setIsShoppingCartOnDisplay]=useState(false);
    var IsCookieCleared=null;

    var[SearchBarValue,setSearchBarValue]=useState("");
    var[ShoppingCartProducts,setShoppingCartProducts]=useState([]);
    const navigate=useNavigate();


    useEffect(() => {
        axios.post("http://localhost:3000/GetSession", {}, {
            withCredentials: true
        }).then(response => {
            const hasUserLoginedValue = response.data.has_user_logined;
            setHasUserLogined(hasUserLoginedValue);

            if (hasUserLoginedValue === true) {
                axios.post("http://localhost:3000/NavBar/GetShoppingCartProducts", {}, {
                    withCredentials: true
                }).then((response) => {
                    const rawData = response.data.shopping_cart;
                    const products = [];

                    rawData.split("/").forEach(productStr => {
                        const productFields = productStr.split(",");
                        products.push(productFields);
                    });

                    setShoppingCartProducts(products);
                });
            }
        });
    }, []);



    //A function to log the user off
    function LogOff(){

        axios.post("http://localhost:3000/LogOff",{},{
            withCredentials:true
        })

        .then((Response)=>{

            IsCookieCleared=Response.data.is_cookie_cleared;

            //Re-direct user to the main page if cookies cleared successfully
            if(IsCookieCleared){
                alert("You successfully logged off...");
                window.location.href="/";
            }            
            else{
                alert("An error occured on logging off.");
            }
        });
    }

    return(
        <>
            <div id='nav-bar' className="container-fluid d-flex justify-content-around align-items-center pt-2 pb-2 border">
                
                <a href={HasUserLogined ? '/After-Login' :'/'}>Homepage</a>
                <a href="/Categorie-Display/Men">Men</a>
                <a href="/Categorie-Display/Women">Women</a>
                <a href="/Categorie-Display/Boys">Boys</a>
                <a href="/Categorie-Display/Girls">Girls</a>

                {
                    //If session is null;Login-Register text will be displayed;

                    //If not;User Profile Icon will be displayed
                }
                <a style={{display:HasUserLogined ? 'none':'block'}} href="/Login-Register">Login/Register</a>

                <Person title='Go To Your User Profile' style={{display: HasUserLogined ? 'block' :'none'}} onClick={()=>{navigate("/User-Profile")}} id='icon'/>


                {
                    //Closes the shopping-cart if its open;Opens shopping-cart if its closed
                }
                
                <Bag title='Display Your Shopping Cart' onClick={()=>{setIsShoppingCartOnDisplay(!IsShoppingCartOnDisplay)}} style={{display: HasUserLogined ? 'block' :'none'}} id='icon' size={"1.1rem"}/>


                {
                    //Closes the search-bar if its open;Opens the search bar if its closed
                }
                <Search title='Search For a Product' onClick={()=>{setIsSearchBarOnDisplay(!IsSearchBarOnDisplay)}} id='search-icon'/>

                {
                    /**
                     * User is going to log off with clicking it
                     * If there is no login;It is not going to appear
                     */
                    
                }
                <Unlock style={{display:HasUserLogined ? 'block':'none'}} title='Log Off' onClick={LogOff} id='search-icon'/>
            </div>

            <div style={{display:IsShoppingCartOnDisplay ? 'block':'none'}} id="nav-bar-shopping-cart" className="container border p-0 m-0">
                <br />
                <div id='products-div' className='container-fluid d-flex justify-content-start align-items-center flex-column gap-2'>
                    <ShoppingCartProduct ProductID={"1"}/>
                </div>

                <div id="shopping-cart-underbar" className='container-fluid pt-2 d-flex justify-content-around align-items-top border'>

                    <div id="info" className='container'>
                        <p>Quantity:1</p>
                        <p>Total Price:100 $</p>
                    </div>

                    <form action="/Proceed-Checkout" method='POST'>
                        <button type="submit">Proceed Checkout</button>
                    </form>
                </div>
            </div>



            {
                //When user clicks on search button;Classname will be set to d-flex from d-none to display the search bar
            }

            <div id="nav-search-bar-div" className={IsSearchBarOnDisplay ? 'container-fluid border d-flex justify-content-center align-items-center' : 'container-fluid border d-none justify-content-center align-items-center'}>

                {
                    //Send the search bar input value as a url parameter
                }
                <form method='get' action={'/Search-Page/'+SearchBarValue} className='d-flex justify-content-center align-items-center flex-row gap-3'>
                    <div class="form-group">
                        <input onChange={(e)=>{setSearchBarValue(e.target.value)}} type="text" required class="form-control" id="exampleInputPassword1" placeholder="Search For A Product..."/>
                    </div>
                    <button type="submit" class="btn btn-primary">Search</button>    
                </form>

            </div>
        </>
    )
}