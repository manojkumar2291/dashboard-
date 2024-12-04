import React from 'react'

const Navbar = ({showloginhandler,showregisterhandler,showlogout,logout}) => {
  

  const firmname=localStorage.getItem('firmname')
  
  return (
    <div className="navsection">
      
        <div className="company">Vender dashboard</div>
    {showlogout?<h4>FirmName :{firmname}</h4>:<></>}
        <div className="userauth">
           { !showlogout ? <><span onClick={showloginhandler}><button className='btn'>Login</button></span>
            <span onClick={showregisterhandler}> / <button className='btn'>Register</button> </span>
            </>:<span onClick={logout} className='logout'>Logout</span>}
        </div>
    </div>
  )
}

export default Navbar