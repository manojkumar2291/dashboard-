import React, { useState } from 'react'
import {API_PATH}  from '../../utilites/Apipath';
import { ThreeCircles } from 'react-loader-spinner';

const Register = ({showloginhandler}) => {
  const [username,setusername]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [error,seterror]=useState('');
  const [loading,setloading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
const handlesubmit=async(e)=>{
  e.preventDefault();
  setloading(true);
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
    }else{
      seterror(data.error);
        alert("Registration Failed, Contact Admin")
    }
  } catch (error) {
    console.error('registration failed');
    alert('registration failed');
  }
  finally {
    setloading(false); 
  }

}


  return (
    <div className="registersection">
      {loading && 
      <div className="loaderSection">
      <ThreeCircles
        visible={loading}
        height={100}
        width={100}
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>Hi, Your Registration under process</p>
    </div>
     }
        
        {!loading && <form  className='authform' onSubmit={handlesubmit}>
        <h3>Vendor Register</h3><br/>
        <label >UserName</label>
            <input type="text" placeholder='enter Username' name='username' value={username} onChange={(e)=>setusername(e.target.value)}/><br/>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='enter Email' name='email' value={email} onChange={(e)=>setemail(e.target.value)}/><br/>
            <label htmlFor="">Password</label>
           
            <input type={showPassword ? "text" : "password"} placeholder='enter Password' name='password' value={password} onChange={(e)=>setpassword(e.target.value)}/><br/>
            <span className='showpassword'
            onClick={handleShowPassword}
              >{showPassword ? 'Hide' : 'Show'}</span>
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>}
    </div>
  )
}

export default Register