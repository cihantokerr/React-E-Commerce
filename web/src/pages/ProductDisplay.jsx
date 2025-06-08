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
        Name:"",
        Description:"",
        Price:0,
        DiscountPercentage:0
    });

    var[ProductStocks,setProductStocks]=useState([]);
    var[ProductSizes,setProductSizes]=useState([]);
    var[ProductColors,setProductColors]=useState([]);


    var[UniqueSizes,setUniqueSizes]=useState([]);//Will be used to display the unique sizes of the product
    var[UniqueColors,setUniqueColors]=useState([]);//Will be used to display the unique colors of the product

    var[ProductStocksColorsSizes,setProductStocksColorsSizes]=useState([]);//Will be used to store the stocks of the product based on the color and size


    var[ClothOrder,setClothOrder]=useState({
        ProductID:productID,
        Color:"",
        Size:"",
        Quantity:1
    });


    //Getting the product information
    useEffect(()=>{
        axios.get("http://localhost:3000/Product-Display/GetProductInformation",{
            params:{
                ProductID:productID
            }
        }).then((Response)=>{
            setProductInfo({
                Name: Response.data.product.name,
                Description: Response.data.product.description,
                Price: parseInt(Response.data.product.price),
                DiscountPercentage: parseInt(Response.data.product.discount_percentage)
            });
            setProductColors(JSON.stringify(Response.data.product.colors).slice(1,-1).split(","));
            setProductSizes(JSON.stringify(Response.data.product.sizes).slice(1,-1).split(","));
            setProductStocks(JSON.stringify(Response.data.product.stocks).slice(1,-1).split(","));

            setUniqueSizes([...new Set(Response.data.product.sizes.split(",").map(size => size.trim()))]);
            setUniqueColors([...new Set(Response.data.product.colors.split(",").map(size => size.trim()))]);
        });

        var combined= [];

            //Grouping the sizes,colors and stocks
        for(var i=0;i<ProductStocks.length;i++){
                combined.push({
                    Color: ProductColors[i],
                    Size: ProductSizes[i],
                    Stock: ProductStocks[i]
                });
        }

        setProductStocksColorsSizes(combined);
    
    },[]);
    


    //Adding the product to the cart
    function AddProductToCart(){

        if(ClothOrder.Color=="" || ClothOrder.Size=="" || ClothOrder.Quantity==0){
            alert("Please select a color, size and quantity");
        }
        else{
            //Finding the index of the product in the stocks based on the color and size
            var index=0;
            for(var i=0;i<ProductStocksColorsSizes.length;i++){
                if(ProductStocksColorsSizes[i].Color==ClothOrder.Color && ProductStocksColorsSizes[i].Size==ClothOrder.Size){
                    index=i;
                    break;
                }
            }

            console.log("ProductStocksColorsSizes: ", ProductStocksColorsSizes);
                
            //Checking if the quantity is less than or equal to the stock
            if(ClothOrder.Quantity > parseInt(ProductStocksColorsSizes[index].Stock)){
                alert("The quantity is greater than the stock");
            }
            else{
                axios.post("http://localhost:3000/Product-Display/AddProductToCart", {
                    ClothOrder: ClothOrder,
                },{withCredentials:true}).then(()=>{
                    alert("Product added to cart successfully");
                });
            }
            
            
        }
    }

    return(
        <>
            <NavBar/>

            <br /><br /><br /><br />

            <div id="product-display-body" className="container-fluid d-flex justify-content-center align-items-top">
                
                <div id="carousel" className="container"></div>

                <div id="info-body" className="container d-flex justify-content-top align-items-start flex-column gap-2 pt-4 px-5">
                    
                    <h1 id="header">{ProductInfo.Name}</h1>

                    <br /><br />

                    <div id="sizes" className="container d-flex justify-content-start align-items-center flex-row gap-5">
                        {
                            UniqueSizes.map((size, index) => {

                                return(
                                    <>
                                        <p onClick={()=>{setClothOrder(prev => ({...prev,Size: size}))}} id="selection">{size}</p>
                                    </>
                                )
                            })
                        }
                    </div>

                    <br /><br />

                    <div id="colors" className="container-fluid d-flex justify-content-start align-items-start flex-row gap-5">

                        {
                            UniqueColors.map((color, index) => {
                                return(
                                    <>
                                        <div onClick={()=>{setClothOrder(prev=>({...prev,Color:color}))}} id="color" className="container p-0 m-0 border" style={{backgroundColor:color}}></div>
                                    </>
                                )
                            })
                        }
                    </div>  

                    <br /><br />

                    <div id="colors" className="container-fluid d-flex justify-content-start align-items-start flex-row gap-5">
                        <input id="quantity-input" style={{width:"3rem"}} type="number" value={ClothOrder.Quantity} onChange={(e)=>{setClothOrder(prev=>({...prev,Quantity:e.target.value}))}} class="form-control"/>
                    </div>  

                    <br /><br /><br />

                    <div id="price-div" className="container w-100 d-flex justify-content-start align-items-start flex-row gap-5 p-0 m-0">

                        <br />

                        <p className="px-0 pt-2" style={{
                            textDecoration:ProductInfo.DiscountPercentage!=0 ? 'line-through red':'none',
                            fontSize:ProductInfo.DiscountPercentage!=0 ? '2rem':'2.5rem'
                            }} id="price">{ProductInfo.Price} $</p>


                        <p style={{display:ProductInfo.DiscountPercentage==0 ? 'none':'block'}} className="p-2" id="discounted-price">{
                            
                                ProductInfo.Price - (ProductInfo.Price * (ProductInfo.DiscountPercentage / 100))
                            } $</p>
                    </div>

                    <br /><br />

                    <div id="add-button" className="container-fluid d-flex justify-content-start align-items-center">
                        <button onClick={AddProductToCart}>Add Product</button>
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