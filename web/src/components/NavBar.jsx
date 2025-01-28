import 'bootstrap/dist/css/bootstrap.css'
import './style/nav-bar.css'
import {Search,Person,Bag} from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import ShoppingCartProduct from './ShoppingCartProduct';

export default function NavBar(){

    var[IsSessionNull,setIsSessionNull]=useState(true);
    var[IsSearchBarOnDisplay,setIsSearchBarOnDisplay]=useState(false);
    var[IsShoppingCartOnDisplay,setIsShoppingCartOnDisplay]=useState(false);
    

    const navigate=useNavigate();

    return(
        <>
            <div id='nav-bar' className="container-fluid d-flex justify-content-around align-items-center pt-2 pb-2 border">

                <a href="/">Homepage</a>
                <a href="/Display-Product/Men">Men</a>
                <a href="/Display-Product/Women">Women</a>
                <a href="/Display-Product/Boys">Boys</a>
                <a href="/Display-Product/Girls">Girls</a>

                {
                    //If session is null;Login-Register text will be displayed;

                    //If not;User Profile Icon will be displayed
                }
                <a style={{display:IsSessionNull ? 'block':'none'}} href="/Login-Register">Login/Register</a>

                <Person style={{display: IsSessionNull ? 'none' :'block'}} onClick={()=>{navigate("/User-Profile")}} id='icon'/>


                {
                    //Closes the shopping-cart if its open;Opens shopping-cart if its closed
                }
                
                <Bag onClick={()=>{setIsShoppingCartOnDisplay(!IsShoppingCartOnDisplay)}} style={{display: IsSessionNull ? 'none' :'block'}} id='icon' size={"1.1rem"}/>


                {
                    //Closes the search-bar if its open;Opens the search bar if its closed
                }
                <Search onClick={()=>{setIsSearchBarOnDisplay(!IsSearchBarOnDisplay)}} id='search-icon'/>
            </div>

            <div style={{display:IsShoppingCartOnDisplay ? 'block':'none'}} id="nav-bar-shopping-cart" className="container border p-0 m-0">
                <br />
                <div id='products-div' className='container-fluid d-flex justify-content-start align-items-center flex-column gap-2'>
                    <ShoppingCartProduct ProductID={"1"}/>
                    <ShoppingCartProduct ProductID={"1"}/>
                    <ShoppingCartProduct ProductID={"1"}/>
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

                <form className='d-flex justify-content-center align-items-center flex-row gap-3'>
                    <div class="form-group">
                        <input type="text" required class="form-control" id="exampleInputPassword1" placeholder="Search For A Product..."/>
                    </div>
                    <button type="submit" class="btn btn-primary">Search</button>    
                </form>

            </div>
        </>
    )
}