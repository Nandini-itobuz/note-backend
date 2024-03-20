import mongoose from "mongoose";
const {Schema} = mongoose;

const noteSchema = new Schema({
    createAt :{
        type: Date,
        default : () =>new Date()
    },
    updatedAt :{
        type:Date,
        default :()=> new Date()
    },
    title :{
        type:String,
        uppercase: true,
        require:true
    },
    note :{
        type:String,
        lowercase: true
    }
},{timestamp:true})

export default mongoose.model("noteSchema",noteSchema)

