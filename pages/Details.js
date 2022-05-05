import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {corporate_fee, individual_fee} from '../lib/Constants';
import format from "./format";
import SiteNav from "./Nav";

export default function Details() { 
  const router = useRouter();
  const [memberdata, setMemberdata] = useState("");
  const [feerate, setFeerate] = useState("");
  const [fee, setFee] = useState("0");

  useEffect(() => { 
    //if (!router.isReady) return;

    if (Object.keys(router.query).length > 0) {
      const data = router.query.member;
      console.log("member: ", data);
    
      let formatted = format(router.query);
      console.log(formatted);
      setMemberdata(formatted);

      if (router.query.member === "corporate") {
          setFeerate(corporate_fee + " BTC for Corporate Members");
          setFee(corporate_fee);
        } else if (router.query.member === "individual") { 
          setFeerate(individual_fee + " BTC for Individual Members");
          setFee(individual_fee);
        }
      }      
  }, [router.query, memberdata, feerate, fee]);

  
  const divStyle = {
    height: "100px",
    color: 'orange'
  }

  return (<>
    <SiteNav/>
      <div style={{ marginTop: 150 }}>
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
          <div dangerouslySetInnerHTML={{ __html:memberdata}}/>
        </div>
        </>
  );
}
