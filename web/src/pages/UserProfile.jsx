import { useDeferredValue, useEffect, useState } from 'react'
import './style/user-profile.css'
import {Box, Box2, CreditCard, Person} from 'react-bootstrap-icons'
import axios from 'axios';

export default function UserProfile(){

    //!Open another page for password change

    var[SectionOnDisplay,setSectionOnDisplay]=useState("User-Information");


    var[User,setUser]=useState({
        User_ID:'0',
        Name:'John',
        Surname:'Doe',
        Email_Address:'admin@gmail.com',
        Gender:'M',
        Phone_Number:'123',
        Date_Of_Birth:'',
        Password:'1234',
        Account_Creation:'20/10/2003'
    });

    
    //Getting user information 
    useEffect(()=>{

        axios.post("http://localhost:3000/User-Profile/GetUserInformation",{},{withCredentials:true}).then(
            (Response)=>{

                setUser({
                    User_ID:JSON.stringify(Response.data.user_id).slice(1,-1),
                    Name:JSON.stringify(Response.data.first_name).slice(1,-1),
                    Surname:JSON.stringify(Response.data.last_name).slice(1,-1),
                    Email_Address:JSON.stringify(Response.data.email).slice(1,-1),
                    Gender:JSON.stringify(Response.data.gender).slice(1,-1),
                    Phone_Number:JSON.stringify(Response.data.phone_number).slice(1,-1),
                    Date_Of_Birth:JSON.stringify(Response.data.date_of_birth).slice(1,-1),
                    Password:JSON.stringify(Response.data.password).slice(1,-1),
                    Account_Creation:JSON.stringify(Response.data.account_created_at).slice(1,-1),
                }); 
            }
        );
    },[]);


    function ChangeUserInformation(e){

        e.preventDefault();

        axios.post("http://localhost:3000/User-Profile/ChangeUserInformation",{user_values:User},{withCredentials:true})

        .then(Response=>{

        })
    }

    return(
        <>
            <div id="user-profile-body" className="container-fluid d-flex justify-content-center align-items-top">

                <div id="selection-div" className="container p-0 pt-5 m-0 d-flex justify-content-start align-items-center flex-column gap-4">

                    <div onClick={()=>setSectionOnDisplay("User-Information")} id="selection" className="container-fluid d-flex flex-wrap justify-content-center align-items-center">
                        <p className=''>
                            <Person id='icon'/> User Informations
                        </p>
                    </div>


                    <div onClick={()=>setSectionOnDisplay("Financial-Information")} id="selection" className="container-fluid d-flex flex-wrap justify-content-around align-items-center">
                        <p className=''>
                            <CreditCard id='icon'/> Financial Informations
                        </p>
                    </div>


                    <div onClick={()=>setSectionOnDisplay("Address-Information")} id="selection" className="container-fluid d-flex flex-wrap justify-content-center align-items-center">
                        <p className=''>
                            <Box2 id='icon'/> Address Informations
                        </p>
                    </div>
                </div>


                <div id="display-div" className="container-fluid p-0 m-0 d-flex justify-content-center align-items-top">
                    
                    {
                        //User Informations Section
                    }

                    <div id="user-information-div" className={SectionOnDisplay=="User-Information" ? "container-fluid p-0 m-0 d-flex justify-content-top align-items-center flex-column pt-3":"container-fluid p-0 m-0 d-none justify-content-top align-items-center flex-column pt-3"}>

                        <br />
                        
                        <h1 id='header'>User Information</h1>
                    
                        <div id="info-div" className="container-fluid pt-3 px-4 d-flex justify-content-start align-items-top flex-column gap-2">
                            
                            <div id="user-id-div" className="container-fluid px-5">
                                <h1>User ID:{User.User_ID}</h1>
                            </div>


                            <br />


                            <form onSubmit={ChangeUserInformation} className='d-flex justify-content-around align-items-center flex-wrap flex-row gap-5'>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Name</label>
                                    <input required type="text" class="form-control" value={User.Name} onChange={(e)=>setUser(prev=>({...prev,Name:e.target.value}))} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Name..."/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">Surname</label>
                                    <input  required type="text" value={User.Surname} onChange={(e)=>setUser(prev=>({...prev,Surname:e.target.value}))} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Surname..."/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address
                                        <a href="/Change-Email">(Click Here To Change It)</a>
                                    </label>
                                    <input  value={User.Email_Address} disabled type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Gender</label>
                                    <select required value={User.Gender} onChange={(e)=>setUser(prev=>({...prev,Gender:e.target.value}))} class="form-control" id="exampleFormControlSelect1">    
                                        <option value={"M"}>M</option>
                                        <option value={"F"}>F</option>
                                    </select>
                                </div>

                                
                                <div class="form-group">
                                    <label  for="exampleInputEmail1">Phone Number</label>
                                    <input required type="tel" value={User.Phone_Number} onChange={(e)=>setUser(prev=>({...prev,Phone_Number:e.target.value}))} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Phone Number"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Date Of Birth</label>
                                    <input required type="date" class="form-control" value={User.Date_Of_Birth} onChange={(e)=>setUser(prev=>({...prev,Date_Of_Birth:new Date(e.target.value).toString()}))} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Password
                                        <a href="/Change-Password">(Click Here To Change It)</a>
                                    </label>
                                    <input type="password" value={""} disabled class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Account Creation</label>
                                    <h1 style={{fontSize:"1rem",color:"#949494"}}>{User.Account_Creation}</h1>
                                </div>

                                <div id='submit-button' className="container-fluid d-flex justify-content-center align-items-center">
                                    <button type="submit" class="btn btn-primary">Change User Information</button>
                                </div>
                            </form>
                        </div>
                        
                    </div>


                    {
                        //Financial Information
                    }

                    <div id="financial-information-div" className={SectionOnDisplay=="Financial-Information" ? "container-fluid p-0 m-0 d-flex justify-content-top align-items-center flex-column pt-3":"container-fluid p-0 m-0 d-none justify-content-top align-items-center flex-column pt-3"}>

                    <br />

                    <h1 id='header'>Financial Information</h1>

                    <div id="info-div" className="container-fluid pt-3 px-4 d-flex justify-content-start align-items-top flex-column gap-2">

                        <br />
                        <br /><br />


                        <form className='d-flex justify-content-around align-items-center flex-wrap flex-row gap-5'>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Card Name</label>
                                <input required type="text" class="form-control" value={"Cihan Toker"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Name..."/>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Card Number</label>
                                <input required type="text" pattern='[0-9]{16}' value={"123456789012345"} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Surname..."/>
                            </div>

                            
                            <div class="form-group">
                                <label for="exampleInputEmail1">Card Exp. Date</label>
                                <input required type="month" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Surname..."/>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Card Exp. Date</label>
                                <input required type="text" pattern='[0-9]{3}' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Surname..."/>
                            </div>


                            <div id='submit-button' className="container-fluid d-flex justify-content-center align-items-center">
                            <br /><br /><br /><br /><br /><br />
                                <button type="button" class="btn btn-primary">Change Financial Information</button>
                            </div>
                        </form>
                    </div>

                    </div>


                    {
                        //Address Information
                    }

                    <div id="address-information-div" className={SectionOnDisplay=="Address-Information" ? "container-fluid p-0 m-0 d-flex justify-content-top align-items-center flex-column pt-3":"container-fluid p-0 m-0 d-none justify-content-top align-items-center flex-column pt-3"}>

                    <br />

                    <h1 id='header'>Address Information</h1>

                    <div id="info-div" className="container-fluid pt-3 px-4 d-flex justify-content-start align-items-top flex-column gap-2">

                        <br />
                        <br /><br />


                        <form className='d-flex justify-content-around align-items-center flex-wrap flex-row gap-5'>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Address 1</label>
                                <textarea required class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Address 2</label>
                                <textarea required class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="exampleInputEmail1">City</label>
                                <input required type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Surname..."/>
                            </div>
                    
                            <div class="form-group">
                                <label for="exampleInputEmail1">Zip Code</label>
                                <input required type="text" pattern='[0-9]{3}' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter A New Surname..."/>
                            </div>


                            <div id='submit-button' className="container-fluid d-flex justify-content-center align-items-center">
                            <br /><br /><br /><br /><br /><br />
                                <button type="button" class="btn btn-primary">Change Address Information</button>
                            </div>
                        </form>
                    </div>

                    </div>

                </div>

            </div>
        </>
    )
}