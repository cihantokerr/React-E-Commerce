import { useEffect, useState } from 'react'
import './style/user-profile-finance.css'
import axios from 'axios';
import {Pen,X} from 'react-bootstrap-icons'


export default function UserProfileFinance({Payment_id}){

    const formatDateToMonth = (dateString) => {
        const [day, month, year] = dateString.split('-');
        const date = new Date(`${year}-${month}-${day}`);
        return date.toISOString().slice(0, 7);
    };
    

    var[Info,setInfo]=useState({
        card_number:'',
        card_name:'',
        CVC:'',
        card_exp_date:formatDateToMonth("20-10-2003"),
        IsPriority:null
    });

    var[IseditOnDisplay,setIseditOnDisplay]=useState(false);


    //Fetching all values about payment 
    useEffect(()=>{
        axios.post("http://localhost:3000/User-Profile/GetPaymentInformation",{payment_id:Payment_id},{withCredentials:true}).then(

            (Response)=>{
                setInfo({
                    card_name:JSON.stringify(Response.data.card_name).slice(1,-1),
                    card_number:JSON.stringify(Response.data.card_number).slice(1,-1),
                    CVC:JSON.stringify(Response.data.cvv).slice(1,-1),
                    card_exp_date:JSON.stringify(Response.data.card_exp_date).slice(1,-1),
                    IsPriority:Response.data.is_priority
                })
            }
        );
    },[]);


    //This function is going to set the payment method as a priority
    function SetAsPriority(){

        axios.post("http://localhost:3000/User-Profile/SetPaymentAsPriority",{payment_id:Payment_id},{withCredentials:true}).then((Response)=>{
            if(Response.data.payment_has_changed){
                window.location.href="/User-Profile";
            }
        });
    }


    function DeletePayment(){
        axios.post("http://localhost:3000/User-Profile/DeletePayment",{payment_id:Payment_id},{withCredentials:true}).then((Response)=>{
            if(Response.data.has_payment_deleted){
                window.location.href="/User-Profile";
            }
        });
    }


    function SavePayment(){
        axios.post("http://localhost:3000/User-Profile/SavePayment",{payment_id:Payment_id,payment_info:Info},{withCredentials:true}).then((Response)=>{
            if(Response.data.Is_payment_updated){
                window.location.href="/User-Profile";
            }
        });
    }
    
    
    return(
        <>
        <div id="user-profile-finance-body" className="container border pt-3">
            <div id="card-number" className='container-fluid d-flex justify-content-between align-items-top'>
                <p>{Info.card_name}</p>
                <p>
                    <input onChange={SetAsPriority} checked={Info.IsPriority==1} type="radio" name="" id="" />
                </p>
            </div>

            <div id="card-name" className="container-fluid pt-2">
                <p>{Info.card_number}</p>
            </div>

            <div id="cvc" className="container-fluid pt-2">
                <p>{Info.CVC}</p>
            </div>


            <div id="edit-buttons" className="container-fluid d-flex justify-content-around align-items-center">
                <Pen onClick={()=>{setIseditOnDisplay(true)}} fontSize={"1.5rem"} id='icon'/>
                <X onClick={DeletePayment} fontSize={"2.5rem"} id='icon'/>
            </div>
        </div>


        <div style={{display:IseditOnDisplay ? 'flex' :'none'}} id='user-profile-edit-payment-body' className='container-fluid'>

            <div id="form" className='container w-50'>
                <form className='d-flex justify-content-top pt-5 align-items-center flex-column gap-5'>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Card Number</label>
                        <input value={Info.card_number} onChange={(e)=>{setInfo((prev)=>({...prev,card_number:e.target.value}))}} type="text" pattern='[0-9]{16}' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Card Number"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Card Name</label>
                        <input value={Info.card_name} onChange={(e)=>{setInfo((prev)=>({...prev,card_name:e.target.value}))}} type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Card Name"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">CVC</label>
                        <input value={Info.CVC} onChange={(e)=>{setInfo((prev)=>({...prev,CVC:e.target.value}))}} type="text" pattern='[0-9]{3}' class="form-control" id="exampleInputPassword1" placeholder="Enter CVC"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Card Exp. Date</label>
                        <input min={new Date().toISOString().slice(0, 7)} value={Info.card_exp_date} onChange={(e)=>{setInfo((prev)=>({...prev,card_exp_date:e.target.value}))}} type="month" class="form-control" id="exampleInputPassword1" placeholder="Enter Card Exp. Date"/>
                    </div>
                    <div id="buttons-div" className="container-fluid d-flex justify-content-center align-items-center flex-row gap-3">
                        <button onClick={SavePayment} className='btn btn-primary'>Save Changes</button>
                        <button onClick={DeletePayment} className='btn btn-danger'>Delete</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}