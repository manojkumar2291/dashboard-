import React, { useState } from 'react'
import { API_PATH } from '../../utilites/Apipath';
import { ThreeCircles } from 'react-loader-spinner';







const AddProduct = () => {
  const [productname,setproductname]=useState("");
  const [price,setprice]=useState("");
  const [category,setcategory]=useState([]);
  const [seller,setseller]=useState(false);
  const [Region,setregion]=useState([]);
  const [firmimage,setfirmimage]=useState([]);
  const [description,setdescription]=useState("");
  const [loading, setLoading] = useState(false); 


  const handlecategory=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setcategory(category.filter((i)=>i!==value))
    }
    else{
      setcategory([...category,value])
    }
  }


  const handleregion=(e)=>{
    const value=e.target.value;
    if(Region.includes(value)){
      setregion(Region.filter((i)=>i!==value))
    }
    else{
      setregion([...Region,value])
    }
  }

  const handleimage=(e)=>{
    const selectedimage=e.target.files[0];
    setfirmimage(selectedimage);
  }


  const handlebestseller=(e)=>{
    const best=e.target.value==='true'
     setseller(best);
      }

const handleproduct=async (e)=>{
  e.preventDefault();
  setLoading(true); 
  try {
    const token=localStorage.getItem('logintoken');
    const firmid=localStorage.getItem('firmid');
   
    if(!token && firmid){
      console.log('user not authenticated');
    }
    const formdata=new FormData();
    formdata.append('productName',productname);
    formdata.append('Price',price);
    formdata.append('description',description);
    formdata.append('firmimage',firmimage);
    formdata.append('bestseller',seller)
    category.forEach((value)=> {
      formdata.append('category',value);
      
    });
    Region.forEach((value)=>{
      formdata.append('region',value);
    })
    
     const response=await fetch(`${API_PATH}/product/addproduct/${firmid}`,{
      method:"POST",
      body:formdata
     })
     const data=await response.json();
     if(response.ok){
      alert('product added successfully');
     }
    
  } catch (error) {
    console.error(error)
    
  }finally {
    setLoading(false); 
  }

}



  return (
    <div className="firmsection">
      {loading &&        <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>}
      {!loading && 
    <form className="tableform" onSubmit={handleproduct}>
        <h3>ADD PRODUCT</h3>
    <label >ProductName</label>
        <input type="text" name='productname' value={productname} onChange={(e)=>setproductname(e.target.value)}/><br />
        <label >Price</label>
        <input type="text" name='price' value={price} onChange={(e)=>setprice(e.target.value)}/><br />
        {/*<label >Category</label>
        <input type="radio" /><br />*/}
        <div className="check-inp">
          <label >Category</label>
          <div className="inputcontainer">
            <div className="checkboxcontainer">
            <label>Veg</label>
            <input type="checkbox" checked={category.includes('veg')} value='veg' onChange={handlecategory}/>
          </div>
          <div className="checkboxcontainer">
          <label>Non Veg</label>
            <input type="checkbox" checked={category.includes('non-veg')} value='non-veg' onChange={handlecategory}/>
          </div></div>
        </div><br/>


        {/*<label >Bestseller</label>
        <input type="text" /><br />*/}
        <div className="check-inp">
          <label >Bestseller</label>
          <div className="inputcontainer">
            <div className="checkboxcontainer">
            <label>Yes</label>
            <input type="radio" value='true' checked={seller===true} onChange={handlebestseller}/>
          </div>
          <div className="checkboxcontainer">
          <label>No</label>
            <input type="radio" value='false'  checked={seller===false} onChange={handlebestseller}/>
          </div></div>
        </div><br/>


        {/* region*/}
        <div className="check-inp">
          <label >Region</label>
          <div className="inputcontainer">
            <div className="subcontainer">
              <div className="checkboxcontainer">
            <label>south indian</label>
            <input type="checkbox"  checked={Region.includes('south-indian')} value='south-indian' onChange={handleregion}/>
          </div>
          <div className="checkboxcontainer">
          <label>north Indian</label>
            <input type="checkbox" checked={Region.includes('north-indian')} value='north-indian' onChange={handleregion}/>
          </div></div>
            <div className="subcontainer">
            <div className="checkboxcontainer">
          <label>bakery</label>
            <input type="checkbox"checked={Region.includes('bakery')} value='bakery' onChange={handleregion}/>
          </div>
          <div className="checkboxcontainer">
          <label>chinese</label>
            <input type="checkbox" checked={Region.includes('chinese')} value='chinese' onChange={handleregion}/>
          </div>
            </div>
          </div>
          
        </div><br/>
        <label >Decsription</label>
        <input type="text" name='description' value={description} onChange={(e)=>setdescription(e.target.value)}/><br />
        <label >FProduct Image</label>
        <input type="file"  onChange={handleimage}/><br />
        <div className="btnsubmit">
            <button>Submit</button>
            </div>
    </form>}
   </div>
  )
}

export default AddProduct