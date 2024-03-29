const mongoose=require("mongoose")
const MessageSchema=new mongoose.Schema(
    {
        conversationId:
        {
            type:String
        },
        sender:
        {
            type:String
        },
        text:
        {
            type:String
        },
        read:
        {
            type:Boolean,
            default:false
        }
    },{timestamps:true})
    module.exports=mongoose.model("message",MessageSchema)
