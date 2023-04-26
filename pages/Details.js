import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { corporate_fee, individual_fee } from "../lib/Constants";
import format from "./format";
import SiteNav from "./Nav";
import LNbitsPayment from "./lnbits";

export default function Details() {
  const router = useRouter();
  const [memberdata, setMemberdata] = useState("");
  const [feerate, setFeerate] = useState("");
  const [fee, setFee] = useState("0");

  useEffect(() => {
    //if (!router.isReady) return;

    if (Object.keys(router.query).length > 0) {
      const data = router.query.member;

      let formatted = format(router.query);
      // console.log(formatted);
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
    color: "orange",
  };

  return (
    <>
      <SiteNav />
      <div style={{ marginTop: 150 }}>
        <h1>Ok, now that we have your information....</h1>
      </div>

      <div>
        <h3> Pay Member Dues with LNbits </h3>
        <p>
          Pay membership fee by clicking on the LNbits button below. This self
          hosted payment provider accepts either lightning or bitcoin. Once you
          click, do not go back. If any issues, please contact info[at]bitcoin.org.hk
        </p>
        <p>
          {" "}
          <b style={divStyle}> {feerate}</b>{" "}
        </p>
        <LNbitsPayment fee={fee} memberdata={memberdata}/>
      </div>

      <div>
        <div dangerouslySetInnerHTML={{ __html: memberdata }} />
      </div>
    </>
  );
}
