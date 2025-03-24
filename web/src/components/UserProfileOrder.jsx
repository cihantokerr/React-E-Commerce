import { useEffect, useState } from "react";
import "./style/user-profile-order.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Pen, X } from "react-bootstrap-icons";

export default function UserProfileOrder({ OrderID }) {
  const [isEditOnDisplay, setIsEditOnDisplay] = useState(false);
  const [Info, setInfo] = useState({
    card_number: "1230000000000000",
    card_name: "John Doe",
    CVC: "123",
    card_exp_date: "20-10-2003", // Ensure this is properly formatted before use
    IsPriority: null,
  });

  function setAsPriority() {
    alert("Set as priority");
  }

  function SaveOrder(event) {
    alert("Saving changes...");
  }

  function CancelOrder() {
    console.log("Deleting card information...");
  }

  return(
    <div className="accordion" id="accordionExample">
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingOne">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Order ID: {OrderID}
        </button>
      </h2>
      <div
        id="collapseOne"
        className="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">

          Order
        </div>
      </div>
    </div>


  </div>
  )
}
