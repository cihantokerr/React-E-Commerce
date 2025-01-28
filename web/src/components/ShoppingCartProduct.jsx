import './style/shopping-cart-product-component.css'

export default function ShoppingCartProduct({ProductID}){

    return(
        <>
            <div id="shopping-cart-product" className="container-fluid d-flex justify-content-around align-items-center">

                <div id="photo" className="container border"></div>

                <div id="info" className="container d-flex flex-grow-1 justify-content-start align-items-top pt-1 flex-column flex-wrap">
                    
                    <div id="product-name" className='container-fluid d-flex justify-content-start p-0 m-0 flex-wrap'>
                        <p className='text-truncate'>
                            <a href={"/Display-Product/"+ProductID}>T-Shirt Red</a>
                        </p>
                    </div>



                    <div id="product-info" className='container-fluid p-0 m-0 d-flex justify-content-start align-items-center flex-row gap-3'>
                        <p>Size:M</p>
                        <p className='text-truncate'>Color: Cyan Blue</p>
                        <p className='text-truncate'>Quantity:9999999</p>
                    </div>



                    <div id="product-price" className='container-fluid d-flex justify-content-start align-items-center flex-row p-0 m-0 gap-2'>
                        <p style={{textDecoration:"line-through red"}} id='price'>50$</p>
                        <p id='discounted-price'>50$</p>
                    </div>
                </div>

                <div id="remove-product" className="container d-flex justify-content-center align-items-center">
                    <p>X</p>
                </div>
            </div>
        </>
    )
}