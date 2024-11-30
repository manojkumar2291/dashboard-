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
            
        }

    }
    
   


  return (
    <div>
        {product.length===0 ? (<p>No Products added</p>):
        <table>
            <thead>
                <tr>
                    <th>PRODUCT NAME</th>
                    <th>PRICE</th>
                    <th>Image</th>
                    <th>delete</th>
                    <th>{product.length}</th>
                    
                </tr>

            </thead>
            <tbody>
                {product.map((item,i)=>{
                    return(
                    <tr key={i}>
                        <td>{item.productName}  </td>
                        <td>{item.Price}</td>
                        <td>{item.image?<img src={`${API_PATH}/uploads/${item.image}`} alt={item.productname}/>:<></>}</td>
                        <td><button  onClick={()=>{productdeletebyid(item._id)}}>delete</button></td>
                    </tr>
                    )
                })}
            </tbody>
        </table>}
    </div>
  )
}

export default AllProducts