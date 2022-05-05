import React, { useEffect, useState} from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {corporate_fee, individual_fee} from './Constants';

export default function Details() { 
  const router = useRouter();
  const [memberdata, setMemberdata] = useState("");
  const [feerate, setFeerate] = useState("");
  const [fee, setFee] = useState("0");

  useEffect(() => { 
    console.log("router query ", router.query);
    console.log("member type: ", router.query.member);
    console.log("router.query string:", JSON.stringify(router.query));

    let obj = router.query;
    let fcontent = "<ul>";
    for (var key in obj) {
      var value  = obj[key];
      console.log(key, value);
      fcontent = fcontent + "<li><b>" + key + "</b>: " +   value + "</li> ";
    }
    fcontent = fcontent +  "</ul>";
    console.log(fcontent);
    setMemberdata(fcontent);

    // don't show this detail page if no data submitted
    // incase someone tries to get to the details page without submitting form data
    // bounce back to error page
   if (JSON.stringify(router.query) === JSON.stringify({})){ 
      router.push({pathname: '/error'});
    } 

    if (router.query.member === "corporate") {
      setFeerate(corporate_fee + " BTC for Corporate Members");
      setFee(corporate_fee);
    } else if (router.query.member === "individual") { 
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
      <Link href="/" className="link">
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

           <p> <div dangerouslySetInnerHTML={{ __html:memberdata}}/> </p>
        </div>
  </div>
  );
}
