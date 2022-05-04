import React, { useEffect, useState} from "react";
//import { NavLink } from "react-router-dom";
import Link from 'next/link';

import {useLocation, useNavigate} from 'react-router-dom';
import {corporate_fee, individual_fee} from './Constants';


export default function Details() { 

  const location = useLocation();
  const navigate = useNavigate();
  const [memberdata, setMemberdata] = useState("");

  const [feerate, setFeerate] = useState("");
  const [fee, setFee] = useState("0");

  useEffect(() => { 
    console.log("location state", location.state);
    console.log("member type: ", location.state.member);
    setMemberdata(JSON.stringify(location.state));

    // don't show this detail page if no data submitted 
    // bounce back to home
    if (location.state === null){ 
      navigate('/');
    } 
    if (location.state.member === "corporate") {
      setFeerate(corporate_fee + " BTC for Corporate Members");
      setFee(corporate_fee);
    } else if (location.state.member === "individual") { 
      setFeerate(individual_fee + " BTC for Individual Members");
      setFee(individual_fee);
    }
  })

  const divStyle = {
    height: "100px",
    color: 'orange'
  }

  return (
   <div style={{ marginTop: 30 }}>
      <Link to="/" className="link">
        Go Home
      </Link>

      <div style={{ marginTop: 50 }}>
        <h1>Ok, now that we have your information....</h1>
      </div>

      <div>
          <h3> Pay Member Dues with BTCPay </h3>
          <p> 
            Pay membership fee by clicking on the pay button below.
            This self hosted payment provider accepts either lightning or bitcoin. 
          </p>

            <p> <b style={divStyle}> {feerate}</b> </p>

          <form method="POST" action="https://btcpay.bitcoin.org.hk/api/v1/invoices">
            <input type="hidden" name="storeId" value="5fv2Vt5WEuLYBzkhFiaDN4r6xy6JdNqTbi3m1mG4ngFa" />
            <input type="hidden" name="currency" value="BTC" />
            <input type="hidden" name="price" value={fee} />
            <input type="image" src="https://btcpay.bitcoin.org.hk/img/paybutton/pay.png" name="submit" style={{width: 209, border:0}}  alt="Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"/>
          </form>
        </div>

        <div>
          <h3> Your submitted info</h3>
           <p> {memberdata} </p>
        </div>
  </div>
  );
}
