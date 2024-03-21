import mongoose from "mongoose";
const {Schema} = mongoose;

const noteSchema = new Schema({
    title :{
        type:String,
        uppercase: true,
        require:true
    },
    note :{
        type:String,
        lowercase: true
    },
    userId :{
        type :mongoose.Schema.Types.ObjectId,
        ref:"Person"
    },
    isSoftDelete:{
        type:Boolean,
        default :false,
    },
},{timestamps: true})

export default mongoose.model("noteSchema",noteSchema)