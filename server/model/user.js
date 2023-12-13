import mongoose from "mongoose";



const Userschema=new mongoose.Schema(
    {

        firstName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },

        lastName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        email:{
            type:String,
            require:true,
            min:2,
            unique:true
        },
        
        password:{
            type:String,
            require:true,
            min:5,
            
        },
        twitter:String,
        LinkedIn:String,
        
        picturePath:{
            type:String,
            default:"",
            
        },
        friends:{
            type:Array,
            default:[],
        },
        location:String,
        occupation:String,
        viewedProfile:Number,
        impression:Number

}
,{timestamps:true}
)



const user=mongoose.model("User",Userschema)

export default user;
