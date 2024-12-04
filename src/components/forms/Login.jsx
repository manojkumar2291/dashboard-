import { useState } from 'react';
import React from 'react'
import { API_PATH } from '../../utilites/Apipath';

const Login = ({welcomehandle,showregisterhandler}) => {
  
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');


  const loginhandler=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_PATH}/vender/login`,{method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
      })
     
      const data=await response.json();
      console.log(data);
    if(response.ok){
      
      localStorage.setItem('logintoken',data.token);
      
      alert('vender login successfully');
      setemail('')
      setpassword('');
      localStorage.setItem('firmid',data.venderfirmid);
      localStorage.setItem('name',data.vendorname)
      try {
          const firmresponse=await fetch(`${API_PATH}/product/getproductsbyfirm/${data.venderfirmid}`)
            const newproducts=await firmresponse.json();
            localStorage.setItem('firmname',newproducts.firmname);
            window.location.reload();
            
      } catch (error) {
        console.log(error);
      }
      welcomehandle();
    }
    } catch (error) {
      console.error('login failed');
    alert(error);
      
    }

  }



  return (
    <div className='loginsection'>
        
        <form onSubmit={loginhandler} className='authform'>
          <h3>Vendor Login</h3>
            <label htmlFor="">Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='enter Email'/><br/>
            <label htmlFor="">Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='enter Password'/><br/>
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div><br/>

        </form>


    </div>
  )
}

export default Login