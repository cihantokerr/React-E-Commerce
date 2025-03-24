import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../components/NavBar';
import './style/product-display.css'
import Footer from '../components/Footer';
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDisplay(){

    var {productID} = useParams();

    var[ProductInfo,setProductInfo]=useState({
        ProductName:"T-Shirt",
        ProductPrice:100,
        Color1:"",
        Color2:"",
        Color3:"",
        DiscountedPrice:90,
        Description:"Desc 1"
    });

    var[IsProductOnDiscount,setIsProductOnDiscount]=useState(null);


    var[ProductStocks,setProductStocks]=useState({

        Color_1_S_Stock:0,
        Color_2_S_Stock:0,
        Color_3_S_Stock:0,

        Color_1_M_Stock:0,
        Color_2_M_Stock:0,
        Color_3_M_Stock:0,

        Color_1_L_Stock:0,
        Color_2_L_Stock:0,
        Color_3_L_Stock:0,

        Color_1_XL_Stock:0,
        Color_2_XL_Stock:0,
        Color_3_XL_Stock:0,
    });

        //Getting product information
        useEffect( async ()=>{

            await axios.get("http://localhost:3000/Product-Display/GetProductInformation",{
                params:{
                    ProductID:productID
                }
            }).then((Response)=>{

                setProductInfo({
                    ProductName:Response.data.product_name,
                    ProductPrice:parseInt(Response.data.price),
                    Color1:Response.data.color1,
                    Color2:Response.data.color2,
                    Color3:Response.data.color3,

                    //Calculating the discounted price
                    DiscountedPrice:parseInt(Response.data.price)-(parseInt(Response.data.discount_percentage)/100),

                    Description:Response.data.product_desc
                });

                setIsProductOnDiscount(parseInt(Response.data.discount_percentage)==0 ? false:true);
            });

            //Getting product stocks

            await axios.get("http://localhost:3000/Product-Display/GetProductStocks",{params:{product_id:productID}}).then((Response)=>{

                setProductStocks({
                    Color_1_S_Stock:Response.data.Color_1_S_Stock,
                    Color_2_S_Stock:Response.data.Color_2_S_Stock,
                    Color_3_S_Stock:Response.data.Color_3_S_Stock,

                    Color_1_M_Stock:Response.data.Color_1_M_Stock,
                    Color_2_M_Stock:Response.data.Color_2_M_Stock,
                    Color_3_M_Stock:Response.data.Color_3_M_Stock,

                    Color_1_L_Stock:Response.data.Color_1_L_Stock,
                    Color_2_L_Stock:Response.data.Color_2_L_Stock,
                    Color_3_L_Stock:Response.data.Color_3_L_Stock,

                    Color_1_XL_Stock:Response.data.Color_1_XL_Stock,
                    Color_2_XL_Stock:Response.data.Color_2_XL_Stock,
                    Color_3_XL_Stock:Response.data.Color_3_XL_Stock
                });
            })

        },[]);

    var[SelectedColor,setSelectedColor]=useState("");
    var[SelectedSize,setSelectedSize]=useState("");

    function AddProduct(){

        var ProductInStocks=false;

        //If user has not selected a color or a size;Display an error
        if(SelectedColor=="" || SelectedSize==""){
            alert("Please select a size or a color to add the product to the shopping cart");
        }
        else{
            //Checking the selected color and size's stock 
            if(SelectedColor=="Color1"){

                if(SelectedSize=="S"){
                    if(ProductStocks.Color_1_S_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }
                else if(SelectedSize=="M"){
                    if(ProductStocks.Color_1_M_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }
                else if(SelectedSize=="L"){
                    if(ProductStocks.Color_1_L_Stock==0){
                        alert("Selected product is out of stock!");
                    }  
                    else{
                        ProductInStocks=true;
                    }
                }
                else{
                    if(ProductStocks.Color_1_XL_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }
            }

            else if(SelectedColor=="Color2"){

                if(SelectedSize=="S"){
                    if(ProductStocks.Color_2_S_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }

                else if(SelectedSize=="M"){
                    if(ProductStocks.Color_2_M_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }

                else if(SelectedSize=="L"){
                    if(ProductStocks.Color_2_L_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }

                else{
                    if(ProductStocks.Color_2_XL_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }
            }

            else{

                if(SelectedSize=="S"){
                    if(ProductStocks.Color_3_S_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }

                else if(SelectedSize=="M"){
                    if(ProductStocks.Color_3_M_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }

                else if(SelectedSize=="L"){
                    if(ProductStocks.Color_3_L_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }

                else{
                    if(ProductStocks.Color_3_XL_Stock==0){
                        alert("Selected product is out of stock!");
                    }
                    else{
                        ProductInStocks=true;
                    }
                }
            }
        }


        //If the product is in stock;Add the product to the shopping cart
        if(ProductInStocks){
            axios.post("http://localhost:3000/Product-Display/SaveProductToCart",{
                ProductID:productID,
                Size:SelectedSize,
                Color:SelectedColor

            },
            {withCredentials:true}).then((Response)=>{
                if(Response.data.is_product_saved==true){
                    alert("Product is added to the shopping cart");
                }
            });
        }
    }

    return(
        <>
            <NavBar/>

            <br /><br /><br /><br />

            <div id="product-display-body" className="container-fluid d-flex justify-content-center align-items-top">
                
                <div id="carousel" className="container"></div>

                <div id="info-body" className="container d-flex justify-content-top align-items-start flex-column gap-2 pt-4 px-5">
                    
                    <h1 id="header">{ProductInfo.ProductName}</h1>

                    <br /><br />

                    <div id="sizes" className="container d-flex justify-content-start align-items-center flex-row gap-5">

                        <p onClick={()=>{setSelectedSize("S")}} id="selection">S</p>

                        <br />
                        <p onClick={()=>{setSelectedSize("M")}} id="selection">M</p>
                        <br />
                        <p onClick={()=>{setSelectedSize("L")}} id="selection">L</p>
                        <br />
                        <p onClick={()=>{setSelectedSize("XL")}} id="selection">XL</p>
                    </div>

                    <br /><br />

                    <div id="colors" className="container-fluid d-flex justify-content-start align-items-start flex-row gap-5">
                        <div style={{backgroundColor:ProductInfo.Color1,display:ProductInfo.Color1==null ? 'none':'block'}} onClick={()=>{setSelectedColor("Color1")}} id="color" className="container p-0 m-0 border"></div>
                        <div style={{backgroundColor:ProductInfo.Color2,display:ProductInfo.Color2==null ? 'none':'block'}} onClick={()=>{setSelectedColor("Color2")}} id="color" className="container p-0 m-0 border"></div>
                        <div style={{backgroundColor:ProductInfo.Color3,display:ProductInfo.Color3==null ? 'none':'block'}} onClick={()=>{setSelectedColor("Color3")}} id="color" className="container p-0 m-0 border"></div>
                    </div>  

                    <br /><br /><br />

                    <div id="price-div" className="container w-100 d-flex justify-content-start align-items-start flex-row gap-5 p-0 m-0">

                        <br />

                        <p className="px-0 pt-2" style={{
                            textDecoration:IsProductOnDiscount ? 'line-through red':'none',
                            fontSize:IsProductOnDiscount ? '2rem':'2.5rem'
                            }} id="price">{ProductInfo.ProductPrice} $</p>


                        <p style={{display:IsProductOnDiscount ? 'block':'none'}} className="p-0" id="discounted-price">{ProductInfo.DiscountedPrice} $</p>
                    </div>

                    <br /><br />

                    <div id="add-button" className="container-fluid d-flex justify-content-start align-items-center">
                        <button onClick={AddProduct}>Add Product</button>
                    </div>
                </div>
            </div>


            <div className="container-fluid pt-4 d-flex justify-content-between align-items-start flex-row gap-0 w-100">
                <div id="carousel" className="container p-0 m-0">a</div>
                <div id="carousel" className="container p-0 m-0">a</div>
            </div>

                        
            <br /><br/><br /><br/>
            <div className="container-fluid pt-5 d-flex justify-content-center align-items-center flex-column gap-2" id="product-display-desc">
                <h1 className="pt-3">Product Description</h1>
                <p className="pt-5">{ProductInfo.Description}</p>
            </div>
            <br /><br /><br /><br /><br/><br /><br/><br /><br/>
           <Footer/> 
        </>
    )
}