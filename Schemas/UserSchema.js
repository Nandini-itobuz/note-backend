import mongoose from "mongoose";
const {Schema} = mongoose;

const personSchema = new Schema({
    name:String,
    email:{
        type:String,
        lowercase: true,
        trim:true
    },
    password: {
        type :String,
        minLength:6,
        maxLength:11
    }
})

export default mongoose.model("Person", personSchema);