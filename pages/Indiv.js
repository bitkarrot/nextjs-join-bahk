import React from 'react';
import {useState} from 'react';

import { useForm } from 'react-hook-form';
import Header from "./Header";
import SiteNav from "./Nav";
//import { useNavigate } from 'react-router-dom';

export default function IndividualForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  console.log(errors);
//  const navigate = useNavigate();

  function onSubmit(data) { 
    console.log("inside onSubmit")
    let newdata = {"member": "individual", ...data}
    console.log("newdata", newdata)

    setData(newdata)
    console.log("original", data)

    // push data to sendmail, if success then forward to details
    // if fail then send to error page. 
//    navigate('/Details', { state: newdata });
    // alert(JSON.stringify(data))

  }

  return (<>
  <SiteNav/>
   <div style={{ marginTop: 150 }}>
   <form onSubmit={handleSubmit(onSubmit)}>
     <Header kind="individual"/>
      <input type="text" placeholder="Your Name:" {...register("name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="公司名:" {...register("chinese", {required: false, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="text" placeholder="Telegram handle" {...register("telegram", {})} />
      <input type="text" placeholder="Keybase handle" {...register("keybase", {})} />

    <label>Would you like your membership status to be published on our website?</label>
    <select {...register("public_status", { required: true })}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

    <label>Are you closely related to Hong Kong and willing to be physically present at our annual general meetings? </label>
    <select {...register("based_in_hk", { required: true })}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      
      <input type="submit" />
    </form>
    </div>
    </>
  );
}