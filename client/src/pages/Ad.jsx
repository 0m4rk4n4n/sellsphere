import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import UserImg from "../resources/user.png";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../config/Config.js"
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import CheckIcon from '@mui/icons-material/Check';
import Picture from "../components/Picture";
import { useSelector } from "react-redux";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LoadingGifff from "../Gif/LoadingGifff.gif"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import EvStationIcon from '@mui/icons-material/EvStation';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PlaceIcon from '@mui/icons-material/Place';
const Ad = () => {
  const [opened,setOpened]=useState(false)
  const [user,setUser]=useState({})
  const path = useParams();
  const [image1,setImage1]=useState("")
  const [image2,setImage2]=useState("")
  const [continueToDel,setContinueToDel]=useState(false)
  const [image3,setImage3]=useState("")
  const [image4,setImage4]=useState("")
  const [desc, setDesc] = useState("");
  const [numSel,setNumSel]=useState(-1)
  const [focused,setFocused]=useState(false)
  const [tarConv,setTarConv]=useState(null)
  const [userId,setUserId]=useState(0)
  const [msg,setMsg]=useState("")
  const [openn,setOpenn]=useState(false)
  const {currentUser}=useSelector(state=>state.user)
  const {location} = useSelector(state=>state.location)
  const [open, setOpen] = useState(false)
  const [msgSent,setMsgSent]=useState(false)
  const [msgloading,setMsgloading]=useState(false)
  const [defaultMsg,setDefaultMsg]=useState("Type your message here...")
  const [arr,setArr]=useState([])
  const handleFocus=(e)=>
  {
    e.target.value=""
  }
  useEffect(()=>
  {
    if(focused)
    {
      setDefaultMsg("")
    }
  },[focused])
  const handleMsgWithNoUSer=()=>
  {
setOpenn(true)
setTimeout(() => {
  navigate("/register")
}, 3000);
  }
  const handleMsg=()=>
  {
    if(!currentUser)
    {
      navigate("/register")
    }
    const fun=async()=>
    {
      setMsgloading(true)
      const res=await axiosInstance.get(`/conversation/searchforaconversation/${ad.userId}/${currentUser._id}`)
      if(res.data===false)
      {
        await axiosInstance.post(`/conversation`,{senderId:currentUser._id,receiverId:ad.userId})
      }
          const ress=await axiosInstance.get(`/conversation/getaconversation/${currentUser._id}/${ad.userId}`)
      try 
      {
        await axiosInstance.post(`/message`,{conversationId:ress.data._id,sender:currentUser._id,message:msg})
        setMsgSent(true)
      }
      catch(e)
      {
        console.clear()
      }
      setMsgloading(false)
      }
    fun()
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleclosee = () => {
    setOpenn(false);
  };
  const handleSelection=(num)=>
  {
    setOpened(1)
    setNumSel(num)
  }
  const [loading,setLoading]=useState(false)
  const [ad, setAd] = useState("");
  const navigate=useNavigate()
  const handleDelete=()=>
  {

    const fun=async()=>
    {
      try 
      {
        await axiosInstance.delete(`/autos/deletead/${path.id}`) && navigate(-1)
      }
      catch(e)
      {
        e.response.status===401 && navigate("/session-expired")
        console.clear()
      }}
     fun()
  }
  useEffect(() => {
            window.scrollTo({top:0,behavior:"smooth"})
    const fun = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get(`/autos/getsinglead/${path.id}`);
        setAd(res.data);
        const res2 = await axiosInstance.get(`/auth/getuser/${res.data.userId}`)
        setUser(res2.data)
        setUserId(res2.data._id)
        setDesc(res.data.description)
        setImage1(res.data.Img[0])
        setImage2(res.data.Img[1])
        setImage3(res.data.Img[2])
        setImage4(res.data.Img[3])
        setLoading(false)
      } catch (e) {
        throw e;
      }
    };
    fun();
  }, []);
  const [viewmore, setViewmore] = useState(0);
  const x = useRef();
  const handleReveal = () => {
    x.current.innerHTML =`+1${user.phone}`;
  };
  return (
    <>
{opened && <Picture opened={opened} setOpened={setOpened} numSelected={numSel} setNumSelected={setNumSel} picsArr={ad.Img}/>}
      <Navbar />
      <div >
      <Dialog 
        open={openn}
        onClose={handleclosee}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent >
<span className="locationsBar " style={{display:"block",textAlign:"center",backgroundColor:"#fff",maxHeight:"150px"}}>
<div style={{fontSize:15}}>Please Login or create an account to continue.</div>
<br/>
<div style={{fontSize:15}}>You are being directed to the registeration page</div>
<img style={{backgroundColor:"#fff",mixBlendMode:"hard-light",maxHeight:100,padding:0,margin:0}} src={LoadingGifff}/>
</span>
      </DialogContent>
      </Dialog>
    </div>
      <div className="hideAdForMobile" style={{ backgroundColor: "#f8f9f9", minHeight: "100vh",overflow:"hidden"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-8 col-sm-8 adHeader">
                  <div style={{fontWeight: "bold",fontSize: 30,color: "#373373",}}>From Autos in {location}</div>
                  <br />
                  <br />
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div className="jobId">
                    Ad Id:{" "}
                    {path.id.substring(4, 8) + path.id.substring(8, 14)}
                  </div>
                  {!loading && currentUser && ad.userId===currentUser._id && <button onClick={()=>{setOpen(true)}} style={{borderRadius:4,padding:5,border:"none",color:"#fff",backgroundColor:"crimson",cursor:"pointer",marginBottom:5,fontWeight:"500",boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}}>Delete Ad</button>}
                  </div>
                  <div className="line"></div>
                  <br />
                  <div className="picsSection" style={{ margin: 20 }}>
                    <div
                      style={{fontWeight: "bold",fontSize: 25,margin: "15px 0px",}}>
                      {ad.title}
                    </div>
                    <div style={{alignItems: "center", gap: 5,display:loading ? "none" : "flex",padding:30}}>
                      <div style={{display: "flex",alignItems: "center",gap: 30,}} className="adPic">
                        <img onClick={()=>{handleSelection(0)}} className="pic" width={300} src={image1!==null ? image1 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                      </div>
{ad && ad.Img.length>1 &&                       <div>
{image2!==null && <><div style={{height:`${image3!==null && image4===null ? "11.2vh" : image3===null && image4===null ? "25vh" : ""}`}} className="smallPicDiv">
                          <img onClick={()=>{handleSelection(1)}} className="smallPic" style={{ position: "absolute",height:`${image3===null && image4===null && "100%"}`}} src={image2!==null ? image2 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                        </div>
                        <br/></>}
{image3 !==null && <> <div className="smallPicDiv">
                          <img onClick={()=>{handleSelection(2)}} className="smallPic" src={image3!==null ? image3 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                        </div>
                        <br /></>
}
{image4 !==null && <> <div style={{position:"relative"}} className="smallPicDiv">
                          <img onClick={()=>{handleSelection(3)}} className="smallPic" src={image4!==null ? image4 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                        </div></>}
                      </div>}
                    </div>
                  </div>
                  <div
                style={{ color: "#373373", padding: "10px 50px", fontWeight: "bold",}} className="overview">
                Overview:
              </div>
{!loading && <div className="otherData">
<div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<FormatColorFillIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Color:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.color}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<ShowChartIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Transmission:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.transmission}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<DirectionsCarIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Condition:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.condition}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<WarehouseIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Make:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.make}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<CalendarMonthIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Year:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.year}</span></div>
</div>
</div>
<div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<AttachMoneyIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Price:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" $"}{ ad.price && ad.price.toLocaleString()}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<SpeedIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Kilometers:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.kilometers && ad.kilometers.toLocaleString()}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<EvStationIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Fuel Type:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.fuelType}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<PlaceIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Location:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.location}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<CalendarTodayIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Date Modified:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.createdAt===ad.updatedAt ? "Never" : ad.updatedAt}</span></div>
</div>
</div>
</div>}
</div>
<div className="col-lg-4 col-sm-2 adHeader2">
{!loading &&                   <div className="posted">Posted {format(ad.createdAt)}</div>}
<div style={{padding:20}} className="contact">
                    <img
                      style={{ borderRadius: "50%", display: "block", margin: "5px auto", padding: 5,}} width={100} src={UserImg}/>
                    <div
                      style={{ fontWeight: "bold", color: "#373373", textAlign: "center", padding: 10,}}>
         {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </div>
                    <div style={{ color: "#373373", padding: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10,}}>
                        <div>
                          <PersonIcon />
                        </div>
                  {!loading && <div style={{ color: "grey" }}>Member since {format(`${user.createdAt}`)}</div>}
                      </div>
                    </div>
                    <div style={{ color: "#373373", padding: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10,}}>
                        <div>
                          <FilterNoneIcon />
                        </div>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/user/${userId}`}>
                          <div>View User's ads</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {    !loading && currentUser && currentUser._id!==ad.userId && <>              <br/>
                  <div style={{position:"relative"}} className="contact">
                    <div style={{textAlign:"center",color:"#373373",fontWeight:"bold",position:"absolute",top:5,left:"20%"}}>Send a message to {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</div>
                    <br/>
                    <textarea onFocus={(e)=>{handleFocus(e)}} onChange={(e)=>{setMsg(e.target.value)}} className="txttxttxt" defaultValue={"Type your message here..."} style={{margin:"0px auto",display:"block",height:150,width:"100%",border:"none",backgroundColor:"rgb(248, 249, 249)",fontSize:15,fontFamily:"monospace"}} type="text"/>
                    <br/><br/>
                    { !msgSent ? <button onClick={handleMsg} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"100%",border:"none",padding:5,margin:"-10px auto",display:"block",cursor:"pointer"}}>Send Message</button> : <button className="btnEffect" onClick={handleMsg} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"100%",border:"none",padding:5,margin:"-10px auto",display:"block",cursor:"pointer"}}>
                      
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <div>   Message has been sent</div>
                        <CheckIcon/>
                      </div>
                    </button>}
                  </div></>}
                  {    !currentUser && <>              <br/>
                  <div style={{position:"relative"}} className="contact">
                    <div style={{textAlign:"center",color:"#373373",fontWeight:"bold",position:"absolute",top:5,left:"20%"}}>Send a message to {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</div>
                    <br/>
                    <textarea onFocus={(e)=>{handleFocus(e)}} className="txttxttxt" defaultValue={"Type your message here..."} style={{margin:"0px auto",display:"block",height:150,width:"100%",border:"none",backgroundColor:"rgb(248, 249, 249)",fontSize:15,fontFamily:"monospace"}} type="text"/>
                    <br/><br/>
                    {!msgSent ? <button onClick={handleMsgWithNoUSer} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"100%",border:"none",padding:5,margin:"-10px auto",display:"block",cursor:"pointer"}}>Send Message</button> : <button className="btnEffect" onClick={handleMsg} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"100%",border:"none",padding:5,margin:"-10px auto",display:"block",cursor:"pointer"}}>
                      
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <div>Message has been sent</div>
                        <CheckIcon/>
                      </div>
                    </button>}
                  </div></>}
                </div>
              </div>
            </div>
{!loading && <div>
              <div className="desconDesktop"
                style={{ color: "#373373", padding: "20px 80px", fontWeight: "bold", textAlign:"left"}}>
                Description:
              </div>
              <div className="txtarea adDesc" disabled style={{backgroundColor:"#fafafa", padding:"20px 100px",padding:30,borderRadius:10, fontSize: 20,width:800,minHeight:150,border:"none",marginLeft:50,marginTop:-10,whiteSpace:"break-spaces"}}>{ad.description}</div>
            </div>}
            <div style={{padding:20,display:"none"}} className="contact2">
                    <img className="contact2_img"
                      style={{ borderRadius: "50%", display: "block", margin: "5px auto", padding: 5}} width={100} src={UserImg}/>
                    <div
                    className="contact2_text"
                      style={{ fontWeight: "bold", color: "#373373", textAlign: "center", padding: 10,}}>
                     {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </div>
                    <div className="contact2_text" style={{ color: "#373373", padding: 10 }}>
                      <div className="contact2_text"
                        style={{ display: "flex", alignItems: "center", gap: 10,}}>
                        <div>
                          <PersonIcon />
                        </div>
                  {!loading && <div className="contact2_text" style={{ color: "grey" }}>Member since {format(`${user.createdAt}`)}</div>}
                      </div>
                    </div>
                    <div style={{ color: "#373373", padding: 10 }}>
                      <div className="contact2_text"
                        style={{ display: "flex", alignItems: "center", gap: 10,}}>
                        <div>
                          <FilterNoneIcon/>
                        </div>
                        <Link 
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={`/user/${userId}`}
                        >
                          <div className="contact2_text">View User's ads</div>
                        </Link>
                      </div>
                      <br/>
                      {!loading && currentUser && currentUser._id!==ad.userId && <>
                      <Link to={`/message/${userId}`} style={{display:"flex",alignItems:"center",gap:10,textDecoration: "none", color: "inherit" }}>
                          <LocalPostOfficeIcon/>
                          <div>Send a message</div>
                        </Link>
                        <br/></>}
                    </div>
                  </div>
          </div>
        </div>
      </div>
      <div className="showAdForMobile" style={{ backgroundColor: "#f8f9f9", minHeight: "100vh",overflow:"hidden",display:"none"}}>
        <div className="container">
        <div style={{display:"flex",flexDirection:"column"}} className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-12">
                  <div className="fromAutos" style={{fontWeight: "bold",fontSize: 30,color: "#373373",}}>From Autos in {location}</div>
                  <br />
                  <br />
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div className="jobId">
                    Ad Id:{" "}
                    {path.id.substring(4, 8) + path.id.substring(8, 14)}
                  </div>
                  {!loading && currentUser && ad.userId===currentUser._id && <button onClick={()=>{setOpen(true)}} style={{borderRadius:4,padding:5,border:"none",color:"#fff",backgroundColor:"crimson",cursor:"pointer",marginBottom:5,fontWeight:"500",boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}}>Delete Ad</button>}
                  </div>
                  <div className="line"></div>
                  <br />
                  <div className="picsSectionformobile" style={{ margin: 0}}>
                    <div
                      style={{fontWeight: "bold",fontSize: 25,margin: "10px 0px",fontWeight:800}}>
                      {ad.title}
                    </div>
                    <div style={{color:"rgb(55, 51, 115)",fontSize:18}} className="belowTitle">
                      Posted by {" "}
                      <Link to={`/user/${user._id}`} style={{textDecoration: "none", color: "inherit",fontWeight:"bold",borderBottom:"1px solid rgb(55, 51, 115)"}}>
                       {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                        </Link>
                    </div>
                    {!loading &&                     <div style={{alignItems: "center",justifyContent:"center", gap: 5,display:loading ? "none" : "flex",padding:"30px 0px"}}>
                      <div style={{display: "flex",alignItems: "center"}} className="adPic">
                        <img onClick={()=>{handleSelection(0)}} className="pic" width={250} height={150} src={image1!==null ? image1 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                      </div>
{ad && ad.Img.length>1 &&                       <div>
{image2!==null && <><div style={{minHeight:`${image3!==null && image4===null ? "9vh" : image3===null && image4===null ? "25vh" : ""}`}} className="smallPicDiv">
                          <img onClick={()=>{handleSelection(1)}} className="smallPic smallPic123" style={{ position: "absolute",minHeight:`${image3===null && image4===null && "100%"}`}} src={image2!==null ? image2 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                        </div>
                        <br/></>}
{image3 !==null && <> <div className="smallPicDiv">
                          <img onClick={()=>{handleSelection(2)}} className="smallPic" src={image3!==null ? image3 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                        </div>
                        <br /></>
}
{image4 !==null && <> <div style={{position:"relative"}} className="smallPicDiv">
                          <img onClick={()=>{handleSelection(3)}} className="smallPic" src={image4!==null ? image4 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                        </div></>}
                      </div>}
                    </div>}
                  </div>
                  <div
                style={{ color: "#373373", padding: "20px 0px", fontWeight: "bold"}} className="overview">
                Overview:
              </div>
{!loading && <div className="otherData">
<div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<FormatColorFillIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Color:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.color}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<ShowChartIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Transmission:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.transmission}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<DirectionsCarIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Condition:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.condition}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<WarehouseIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Make:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.make}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<CalendarMonthIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Year:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.year}</span></div>
</div>
</div>
<div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<AttachMoneyIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Price:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" $"}{ ad.price && ad.price.toLocaleString()}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<SpeedIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Kilometers:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.kilometers && ad.kilometers.toLocaleString()}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<EvStationIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Fuel Type:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.fuelType}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:50}}>
<PlaceIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Location:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.location}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<CalendarTodayIcon/>
<div><span style={{color:"rgb(55, 51, 115)",fontWeight:"600"}}>Date Modified:</span><span style={{fontWeight:"500",color:"#61635f"}}>{" "}{ad.createdAt===ad.updatedAt ? "Never" : ad.updatedAt}</span></div>
</div>
</div>
</div>}
</div>
<div className="">
{!loading && <div className="posted">Posted {format(ad.createdAt)}</div>}
<div style={{padding:10}} className="contact">
                    <img
                      style={{ borderRadius: "50%", display: "block", margin: "5px auto", padding: 5,}} width={100} src={UserImg}/>
                    <div
                      style={{ fontWeight: "bold", color: "#373373", textAlign: "center", padding: 10,}}>
                     {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </div>
                    <div style={{ color: "#373373", padding: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10,}}>
                        <div>
                          <PersonIcon />
                        </div>
                  {!loading && <div style={{ color: "grey" }}>Member since {format(`${user.createdAt}`)}</div>}
                      </div>
                    </div>
                    <div style={{ color: "#373373", padding: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10,}}>
                        <div>
                          <FilterNoneIcon />
                        </div>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/user/${userId}`}>
                          <div>View User's ads</div>
                        </Link>
                      </div>
                      <br/>
                      {!loading && currentUser && currentUser._id!==ad.userId && <>
                      <Link to={`/message/${userId}`} style={{display:"flex",alignItems:"center",gap:10,textDecoration: "none", color: "inherit" }}>
                          <LocalPostOfficeIcon/>
                          <div>Send a message</div>
                        </Link>
                        <br/></>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{ color: "#373373", padding: "20px 22px", fontWeight: "bold", textAlign:"left"}}>
                Description:
              </div>
              <div className="txtarea" disabled style={{backgroundColor:"#fafafa", padding:"20px 100px",padding:30,borderRadius:10, fontSize: 20,width:"90%",margin:"0px auto",display:"block",minHeight:150,border:"none",whiteSpace:"break-spaces"}}>{ad.description}</div>
            </div>
          </div>
        </div>
        <br/>
      </div>
      {    !loading && currentUser && currentUser._id!==ad.userId && <div className="showOnSmallDevice" style={{display:"none"}}>              <br/>
                  <div style={{position:"relative"}}>
                    <div style={{textAlign:"center",color:"#373373",fontWeight:"bold"}}>Send a message to {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</div>
                    <br/>
                    <textarea onFocus={(e)=>{handleFocus(e)}} onChange={(e)=>{setMsg(e.target.value)}} className="txttxttxt" defaultValue={"Type your message here..."} style={{margin:"0px auto",display:"block",height:150,width:"80%",border:"none",backgroundColor:"#fff",fontSize:15,fontFamily:"monospace"}} type="text"/>
                    <br/><br/>
                    {!msgSent ? <button onClick={handleMsg} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"80%",border:"none",padding:5,margin:"10px auto",display:"block",cursor:"pointer"}}>Send Message</button> : 
                    <button className="btnEffect" onClick={handleMsg} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"80%",border:"none",padding:5,margin:"10px auto",display:"block",cursor:"pointer"}}>
                      
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <div>   Message has been sent</div>
                        <CheckIcon/>
                      </div>
                    </button>}
                  </div></div>}
                  {    !currentUser && <div className="showOnSmallDevice" style={{display:"none"}}>              <br/>
                  <div style={{position:"relative"}}>
                    <div style={{textAlign:"center",color:"#373373",fontWeight:"bold"}}>Send a message to {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</div>
                    <br/>
                    <textarea onFocus={(e)=>{handleFocus(e)}} className="txttxttxt" defaultValue={"Type your message here..."} style={{margin:"0px auto",display:"block",height:150,width:"80%",border:"none",backgroundColor:"#fff",fontSize:15,fontFamily:"monospace"}} type="text"/>
                    <br/>
                    {!msgSent ? <button onClick={handleMsgWithNoUSer} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"80%",border:"none",padding:5,margin:"10px auto",display:"block",cursor:"pointer"}}>Send Message</button>
                    : 
                    <button className="btnEffect" onClick={handleMsg} style={{backgroundColor:"rgb(55, 51, 115)",color:"white",width:"80%",border:"none",padding:5,margin:"10px auto",display:"block",cursor:"pointer"}}>
                    
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <div>Message has been sent</div>
                        <CheckIcon/>
                      </div>
                    </button>}
                  </div></div>}
      <Footer />
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{textAlign:"center"}} id="alert-dialog-title">
          {"Would you like to continue?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{textAlign:"center"}} id="alert-dialog-description">
            Are you sure you want to delete this Ad?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display:"block",margin:"0px auto"}}>
          <Button style={{color:"blue"}} onClick={handleClose}>No</Button>
          <Button style={{color:"blue"}} onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
};
export default Ad;
