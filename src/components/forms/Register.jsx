import React, { useState } from 'react'
import {API_PATH}  from '../../utilites/Apipath';

const Register = ({showloginhandler}) => {
  const [username,setusername]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [error,seterror]=useState('');
  const [loading,setloading]=useState(true);


const handlesubmit=async(e)=>{
  e.preventDefault();
  try {
    const response=await fetch(`${API_PATH}/vender/register`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({username,email,password})
    })
    const data=await response.json()
    if(response.ok){
      console.log(data);
      setemail('')
      setpassword('')
      setusername('')
      showloginhandler()
      alert('vender registered successfully')
    }
  } catch (error) {
    console.error('registration failed');
    alert('registration failed');
  }

}


  return (
    <div className="registersection">
        
        <form  className='authform' onSubmit={handlesubmit}>
        <h3>Vendor Register</h3><br/>
        <label htmlFor="">UserName</label>
            <input type="text" placeholder='enter Username' name='username' value={username} onChange={(e)=>setusername(e.target.value)}/><br/>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='enter Email' name='email' value={email} onChange={(e)=>setemail(e.target.value)}/><br/>
            <label htmlFor="">Password</label>
            <input type="text" placeholder='enter Password' name='password' value={password} onChange={(e)=>setpassword(e.target.value)}/><br/>
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register