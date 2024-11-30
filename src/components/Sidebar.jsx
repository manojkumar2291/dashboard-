import React from 'react'

const Sidebar = ({showfirmhandler,showproducthandler,showallproducthandler}) => {
  return (
    <div className='sidebarsection'><ul>
        <li onClick={showfirmhandler}>Add Firm</li>
        <li onClick={showproducthandler}>Add Product</li>
        <li onClick={showallproducthandler}>All Product</li>
        <li >User Details</li>
    </ul></div>
  )
}

export default Sidebar