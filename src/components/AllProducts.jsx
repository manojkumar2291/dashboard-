import React, {useState,useEffect} from 'react'
import { API_PATH } from '../utilites/Apipath';

const AllProducts = () => {
    const [product,setproduct]=useState([]);



    useEffect(
        ()=>{
            producthandler();
        },[]
    );
  

    const producthandler=async()=>{
        
        const id=localStorage.getItem("firmid")
        try {
            const response=await fetch(`${API_PATH}/product/getproductsbyfirm/${id}`)
            const newproducts=await response.json();
            setproduct([...newproducts.products])
            
        } catch (error) {
            console.log('failed to fetch products',error);
        }
    }
    const productdeletebyid=async (productid)=>{
        try {
            const response=await fetch(`${API_PATH}/product/deletebyid/${productid}`,{
                method:'DELETE',
            })
            if(response.ok){
                setproduct(product.filter(i=>i._id!==productid))
            }

        } catch (error) {
            alert('Failed to delete product')
        }

    }
    
   


  return (
    <div>
        {product.length===0 ? (<p>No Products added</p>):
        (
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item)=>{
                            return (
                                <>
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>₹{item.Price}</td>
                                    <td>
                                        {item.image && (
                                            <img src={`${API_URL}/uploads/${item.image}`} 
                                            alt={item.productName}
                                            style={{ width: '50px', height:'50px'  }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>productdeletebyid(item._id)}
                                        className='deleteBtn'
                                        >Delete</button>
                                    </td>
                                    </tr>
                                </>
                            )
                    })}
                </tbody>
            </table>
         )}
    </div>
  )
}

export default AllProducts