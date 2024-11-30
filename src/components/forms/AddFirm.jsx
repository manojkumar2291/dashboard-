import React, { useState } from 'react'
import {API_PATH} from '../../utilites/Apipath'
import { ThreeCircles } from 'react-loader-spinner';

const AddFirm = () => {

  const [firmname,setfirmname]=useState("");
  const [area,setarea]=useState("");
  const [category,setcategory]=useState([]);
  const [Region,setregion]=useState([]);
  const [offer,setoffer]=useState("");
  const [firmimage,setfirmimage]=useState([]);
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


  const handlefirmsubmit=async(e)=>{
e.preventDefault();
setLoading(true); 

try {
  const logintoken=localStorage.getItem('logintoken');
if(!logintoken){
  console.error('user not authenticated');
}
const formdata=new FormData();
formdata.append('firmname',firmname);
formdata.append('area',area);
formdata.append('offer',offer);
formdata.append('firmimage',firmimage)
category.forEach((value)=> {
  formdata.append('category',value);
  
});
Region.forEach((value)=>{
  formdata.append('region',value);
})

const response=await fetch(`${API_PATH}/firm/add-firm`,{
  method:'POST',
  headers:{
    "token":`${logintoken}`
    
  },
  body:formdata
})
console.log(response)
const data =await response.json();
if(response.ok){
  console.log(data);
            setfirmname("");
            setarea("")
            setcategory([]);
            setregion([]);
            setoffer("");
            setfirmimage(null)
            
           
            alert("Firm added Successfully")
} else{
  alert('Failed to add Firm')
}

   const mango = data.firmid;
   console.log(mango);
const vendorRestuarant = data.firmname

localStorage.setItem('firmid', mango);
localStorage.setItem('firmname', vendorRestuarant)
window.location.reload()

  
} catch (error) {
  console.log(error)
}
finally {
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
      {!loading && <form className="tableform" onSubmit={handlefirmsubmit}>
        <h3>ADD FIRM</h3>
    <label >Firm Name</label>
        <input type="text"  name='firmname' value={firmname} onChange={(e)=>setfirmname(e.target.value)}/><br />
        <label >Area</label>
        <input type="text" name='area' value={area} onChange={(e)=>setarea(e.target.value)}/><br />
        {/*<label >Category</label>
        <input type="text" /><br />*/}
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
        {/*<label >Region</label>
        <input type="text" /><br />*/}
        <label >Offer</label>
        <input type="text" name='offer' value={offer} onChange={(e)=>setoffer(e.target.value)}/><br />
        <label >Firm Image</label>
        <input type="file"  onChange={handleimage}/><br />
        <div className="btnsubmit">
            <button type='submit' >Submit</button>
            </div>
    </form>}
   </div>
  )
}

export default AddFirm