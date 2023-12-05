import mongoose from 'mongoose';

const productschema=new mongoose.Schema({
    name:String,
    description:String,
    category:String,
    price:Number,
    sizes:Array,
    deliveryInfo:String,
    onSale:String,
    priceDrop:Number,
    imageUrl:String,
},{timestamps:true});



const product=mongoose.models.Products || mongoose.model('Products', productschema);

export default product;