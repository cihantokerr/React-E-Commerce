import { useEffect, useState } from 'react'
import './style/user-profile-finance.css'
import axios from 'axios';
import {Pen,X} from 'react-bootstrap-icons'


export default function UserProfileAddress({AddressID}){


    var[Info,setInfo]=useState({
        Address:'',
        city:'',
        ZIP_Code:'',
        IsPriority:false
    });

    var[IseditOnDisplay,setIseditOnDisplay]=useState(false);


    //Fetching all values about address 
    useEffect(()=>{
        axios.post("http://localhost:3000/User-Profile/GetAddressInformation",{address_id:AddressID},{withCredentials:true}).then(
            (Response)=>{
                setInfo({
                    Address:JSON.stringify(Response.data.Address).slice(1,-1).split(","),
                    city:JSON.stringify(Response.data.City).slice(1,-1).split(","),
                    ZIP_Code:JSON.stringify(Response.data.ZIP_Code).slice(1,-1).split(","),
                    IsPriority:Response.data.IsPriority
                })
            }
        );
    },[]);


    function SetAsPriority(){
        axios.post("http://localhost:3000/User-Profile/SetAddressAsPriority",{address_id:AddressID},{withCredentials:true}).then((Response)=>{
            if(Response.data.address_has_set_as_priority){
                window.location.href="/User-Profile";
            }
        });
    }


    function DeleteAddress(){
        axios.post("http://localhost:3000/User-Profile/DeleteAddress",{address_id:AddressID},{withCredentials:true}).then((Response)=>{
            if(Response.data.has_address_deleted){
                window.location.href="/User-Profile";
            }
        });
    }


    function SaveAddress(){
        axios.post("http://localhost:3000/User-Profile/SaveAddress",{address_id:AddressID,address_info:Info},{withCredentials:true}).then((Response)=>{
            if(Response.data.Is_address_saved){
                window.location.href="/User-Profile";
            }
        });

        alert("Address Saved");
    }
    
    
    return(
        <>
        <div id="user-profile-finance-body" className="container border pt-3">
            <div id="card-number" className='container-fluid d-flex justify-content-between align-items-top'>
                <p>{Info.Address}</p>
                <p>
                    <input onChange={SetAsPriority} checked={Info.IsPriority==1} type="radio" name="" id="" />
                </p>
            </div>

            <div id="card-name" className="container-fluid pt-2">
                <p>{Info.city}</p>
            </div>

            <div id="cvc" className="container-fluid pt-2">
                <p>{Info.ZIP_Code}</p>
            </div>


            <div id="edit-buttons" className="container-fluid d-flex justify-content-around align-items-center">
                <Pen onClick={()=>{setIseditOnDisplay(true)}} fontSize={"1.5rem"} id='icon'/>
                <X onClick={DeleteAddress} fontSize={"2.5rem"} id='icon'/>
            </div>
        </div>


        <div style={{display:IseditOnDisplay ? 'flex' :'none'}} id='user-profile-edit-payment-body' className='container-fluid'>

            <div id="form" className='container w-50'>

                <div id="close-button" className="container-fluid d-flex justify-content-end align-items-center px-5 pt-5">
                    <p onClick={()=>{setIseditOnDisplay(false)}}>X</p>
                </div>

                <form className='d-flex justify-content-top pt-5 align-items-center flex-column gap-5'>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Address</label>
                        <textarea value={Info.Address} onChange={(e)=>{setInfo((prev)=>({...prev,Address:e.target.value}))}} pattern='[0-9]{16}' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address" ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">City</label>
                        <input value={Info.city} onChange={(e)=>{setInfo((prev)=>({...prev,city:e.target.value}))}} type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter City"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">ZIP Code</label>
                        <input value={Info.ZIP_Code} onChange={(e)=>{setInfo((prev)=>({...prev,ZIP_Code:e.target.value}))}} type="text" pattern='[0-9]{3}' class="form-control" id="exampleInputPassword1" placeholder="Enter ZIP Code"/>
                    </div>
                    <div id="buttons-div" className="container-fluid d-flex justify-content-center align-items-center flex-row gap-3">
                        <button onClick={SaveAddress} className='btn btn-primary'>Save Changes</button>
                        <button onClick={DeleteAddress} className='btn btn-danger'>Delete</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}