
import React,{useState,useEffect} from "react";

const API="http://localhost:5000/api";

export default function App(){
 const [auctions,setAuctions]=useState([]);
 const [title,setTitle]=useState("");
 const [price,setPrice]=useState("");
 const [ends,setEnds]=useState("");
 const [bid,setBid]=useState("");

 async function load(){ 
   const r=await fetch(API+"/auctions");
   setAuctions(await r.json());
 }

 async function create(){
  await fetch(API+"/auctions",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({title,startingPrice:Number(price),endsAt:ends})});
  load();
 }

 async function place(id){
  await fetch(API+"/auctions/"+id+"/bid",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({amount:Number(bid)})});
  load();
 }

 useEffect(()=>{load()},[]);

 return <div>
   <h2>Simple Auction</h2>
   <input placeholder="title" onChange={e=>setTitle(e.target.value)} />
   <input placeholder="start price" onChange={e=>setPrice(e.target.value)} />
   <input placeholder="end time" onChange={e=>setEnds(e.target.value)} />
   <button onClick={create}>Create</button>

   {auctions.map(a=><div key={a._id} style={{border:"1px solid #999",margin:10,padding:10}}>
     <h3>{a.title}</h3>
     <p>Current: {a.currentPrice}</p>
     <input placeholder="your bid" onChange={e=>setBid(e.target.value)} />
     <button onClick={()=>place(a._id)}>Bid</button>
   </div>)}
 </div>
}
