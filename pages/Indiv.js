import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from "./Header";
import SiteNav from "./Nav";
import { useRouter } from 'next/router';

export default function IndividualForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  const router = useRouter();
  //console.log(errors);

  async function onSubmit(formdata) { 
    alert("Okay you are now submitting your data");
    //console.log("inside onSubmit")
    let newdata = {"member": "individual", ...formdata}
    setData(newdata)

    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        type: "individual",
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
      // console.log("success pushing to another page ")
      router.push({pathname: '/Details', query: newdata});
    }
  };

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
      
      <input type="submit" value="Submit"/>
    </form>
    </div>
    </>
  );
}