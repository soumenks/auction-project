
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongo connected"));

const auctionSchema=new mongoose.Schema({
 title:String,
 startingPrice:Number,
 currentPrice:Number,
 endsAt:Date,
 bids:[{amount:Number}],
 active:{type:Boolean,default:true}
});
const Auction=mongoose.model("Auction",auctionSchema);

app.get('/api/auctions', async(req,res)=>res.json(await Auction.find()));
app.post('/api/auctions', async(req,res)=>res.json(await Auction.create({...req.body,currentPrice:req.body.startingPrice})));

app.post('/api/auctions/:id/bid', async(req,res)=>{
 const a=await Auction.findById(req.params.id);
 if(Number(req.body.amount)<=a.currentPrice) return res.status(400).json({msg:"low"});
 a.currentPrice=req.body.amount;
 a.bids.push({amount:req.body.amount});
 await a.save();
 res.json(a);
});

app.listen(5000,()=>console.log("Server running"));
