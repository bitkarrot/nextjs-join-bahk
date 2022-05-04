import React from 'react';
import {useState} from 'react';

import { useForm } from 'react-hook-form';
import Header from "./Header";
import SiteNav from "./Nav";

//import { useNavigate } from 'react-router-dom';
//import sendEmail from "./sendgrid";
//import error from "./error";

export default function CorporateForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  console.log(errors);
  // const navigate = useNavigate();

  function onSubmit(formdata) { 
    console.log("inside onSubmit")
    let newdata = {"member": "corporate", ...formdata}

    setData(newdata)
    console.log("newdata", newdata);
    console.log("original", formdata);
    console.log("set data", data);

    //sendEmail("corporate", data);

    // push data to sendmail, if success then forward to details
    // if fail then send to error page. 
    
   //('/Details', { state: newdata });
    
    //    navigate('/error');
    // alert(JSON.stringify(data))

  }

  return (<>
    <SiteNav/>
    <div style={{ marginTop: 150 }}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Header kind="corporate"/>
      <input type="text"  placeholder="Your Organization Name" {...register("orgname", {required: true, maxLength: 80})} />
      <input type="text"  placeholder="公司名:" {...register("chinese", {required:false, maxLength: 100})} />
      <input type="text"  placeholder="Contact Person" {...register("contact", {required: true, maxLength: 80})} />
      <input type="email" placeholder="Contact Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      
      <label style={{ marginBottom: 10 }}>Would you like your membership status to be published on our website?</label>
      <select {...register("public_status", { required: true })}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label style={{ marginBottom: 10 }}>If you would like to publish your membership status, please provide a link to your corporate logo:</label>
      <input type="text" placeholder="Enter a url, http://" {...register("url", {})} />

      <input type="submit" />
    </form>
    </div>
    </>
  );
}