import mongoose from "mongoose";
const {Schema} = mongoose;

const personSchema = new Schema({
    name:String,
    email:{
        type:String,
        lowercase: true,
        trim:true,
        validate:  {
            validator : function (userEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(userEmail);
              },
            message : ({value })=> `Invalid email ${value}`
        }
    },
    password: {
        type :String,
        minLength:6,
        maxLength:11
    }
})

export default mongoose.model("Person", personSchema);