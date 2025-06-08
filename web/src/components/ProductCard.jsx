import './style/product-card.css';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductCard({ProductID,ProductName,ProductPrice,DiscountPercentage}){

    var[DiscountedPrice,setDiscountedPrice]=useState(0);

    //Calculating the discounted price of the product if there is a discount
    useEffect(()=>{
        var DiscountPercentageValue=parseInt(DiscountPercentage);
        var PriceValue=parseInt(ProductPrice);

        if(DiscountPercentageValue!=0){

            setDiscountedPrice(PriceValue-(PriceValue*(DiscountPercentage/100)));
        }
        
    },[]);

    return(
        <div id="product-card-body" className="container p-0 m-0 border d-flex flex-wrap">

            <a id='link' href={"/Display-Product/"+ProductID}>
                
                <div id="photo" className='container w-100'></div>

                <br />

                <div id='product-name' className='container-fluid d-flex justify-content-start align-items-bottom'>
                    <p>{ProductName}</p>
                </div>

                {
                    //If there is no discount on a product;Display the price only

                    //If there is a discount on a product; make the price's font size smaller,add a red line on price and display discounted price
                }
                <div id='product-price' className='container-fluid d-flex justify-content-start align-items-bottom flex-row gap-3'>

                    <p style={{fontSize:DiscountPercentage=="0.00" ? '1.5rem':'1.3rem',textDecoration:DiscountPercentage=="0.00" ? 'none':'line-through red'}} id='price'>{ProductPrice} $</p>

                    <p style={{display:DiscountPercentage=="0.00" ? 'none':'block'}} id='discounted-price'>{DiscountedPrice} $</p>

                </div>
            </a>
        </div>
    )
}