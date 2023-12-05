import mongoose from "mongoose";


const cartschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
},{timestamps:true});


const Cart=mongoose.models.Carts || mongoose.model('Carts',cartschema);

export default Cart;

