const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://issuetracker:itPass1234@cluster0.flf523j.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Connected to mongo DB');
})
.catch((e)=>{
    console.log('failed to connect to DB');
})

const ProductSchema=new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

const eCart=new mongoose.model('E-Cart',ProductSchema);

module.exports=eCart;