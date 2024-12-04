import React from 'react'

const welcome = () => {
  return (
    <div  className="welcomesection"style={{justifyContent:'center',alignItems:'center'}}>welcome {localStorage.getItem('name')}</div>
  )
}

export default welcome