import React, {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/welcome'
import AllProducts from '../components/AllProducts'


const LandingPage = () => {
  const [showlogin,setshowlogin]=useState(false);
  const [showregister,setshowregister]=useState(false);
  const [showfirm,setshowfirm]=useState(false);
  const [showproduct,setshowproduct]=useState(false);
  const [welcome,setwelcome]=useState(false);
  const [showallproducts,setshowallproducts]=useState(false);
  const [showlogout,setshowlogout]=useState(false);
  const [islogin,setislogin]=useState(false);

const showproducthandler=()=>{
  setshowregister(false);
    setshowlogin(false);
    setshowfirm(false);
    setshowproduct(true);
    setshowallproducts(false);
    setwelcome(false);
}

  const showregisterhandler=()=>{
    setshowlogin(false);
    setshowregister(true);
    setshowfirm(false);
    setwelcome(false);
    setshowallproducts(false);
    setshowproduct(false);
  }
  const showloginhandler=()=>{
    setshowregister(false);
    setshowlogin(true);
    setshowfirm(false);
    setshowproduct(false);
    setwelcome(false);
    setshowallproducts(false);
  }
  const showfirmhandler=()=>{
    setshowregister(false);
    setshowlogin(false);
    setshowfirm(true)
    setshowproduct(false);
    setwelcome(false);
    setshowallproducts(false);
  }

  const welcomehandle=()=>{
    setshowlogin(false);
    setwelcome(true);
    
  }
  const showallproducthandler=()=>{
    setshowallproducts(true);
    setshowregister(false);
    setshowlogin(false);
    setshowfirm(false)
    setshowproduct(false);
    setwelcome(false);
    
  }

  useEffect(()=>{
    const logintoken=localStorage.getItem('logintoken')
    if(logintoken){
      setislogin(true);
      setshowlogout(true)
    }
  },[])

  const logout=()=>{
    localStorage.removeItem('logintoken');
    localStorage.removeItem('firmid');
    localStorage.removeItem('firmname');
    localStorage.removeItem('name');
    setislogin(false);
    setshowlogout(false);
  }

  return (
    <>
    <section  className="landingsection">
        <Navbar showloginhandler={showloginhandler} showregisterhandler={showregisterhandler} showlogout={showlogout} logout={logout}/>
        <div className="collectionsection">
        <Sidebar showfirmhandler={showfirmhandler} showproducthandler={showproducthandler} showallproducthandler={showallproducthandler}/>
       {showlogin&& <Login welcomehandle={welcomehandle}/>}
        {(islogin && showregister) && <Register showloginhandler={showloginhandler}/>}
        {(islogin && showfirm )&& <AddFirm/>}
        {islogin && showproduct && <AddProduct/>}
        {(islogin && welcome) && <Welcome/>}
        {islogin && showallproducts && <AllProducts/>}
        </div>
    </section>
    </>
  )
}

export default LandingPage