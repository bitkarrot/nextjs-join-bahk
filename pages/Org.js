import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from "./Header";
import SiteNav from "./Nav";
import { useRouter } from 'next/router';

export default function CorporateForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  console.log(errors);
  const router = useRouter();

  async function onSubmit(formdata) { 
    //console.log("inside onSubmit")
    let newdata = {"member": "corporate", ...formdata}
    setData(newdata)

    //console.log("set data", data);
     // unclear why this isn't updated immediately

    //console.log("new data", newdata);
    //console.log("errors", errors);
    
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        type: "corporate",
        message: newdata,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      // alert(JSON.stringify(error));
      router.push('/error');
    }  else {
      // on success:
      // actually should redirect to Details page, but test this first
      console.log("success pushing to another page ")
      router.push({pathname: '/Details', query: newdata});
    }
  };

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

      <input type="submit" value="Submit" />
    </form>
    </div>
    </>
  );
}