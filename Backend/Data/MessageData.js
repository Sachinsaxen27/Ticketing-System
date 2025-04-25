const express = require('express')
const MessageSchema = require('../Schema/MessageSchem')
const router = express.Router()
const Conversation = require('../Schema/ConversationSchema')
router.post('/send_message', async (req, res) => {
    let success=false
    try {
        const { senderid, senderModel, text, sender, role, userId, adminId } = req.body;
        // let id=adminId?adminId:
        const participants = [userId, adminId];
        let conversation = await Conversation.findOne({
            participants: { $all: participants, $size: 2 }
        });
        if (!conversation) {
            conversation = new Conversation({ participants:participants});
            await conversation.save();
        }
        
        const message = new MessageSchema({
            senderid,
            senderModel,
            message: { sender, text },
            role,
            conversationID: conversation._id,
            
        });
        
        const savedMessage = await message.save();
        success=true
        res.status(200).json({
            success,
            message: "Message sent successfully",
            conversationId: conversation._id,
            data: savedMessage
        });
    } catch (error) {
        success=false
        res.status(500).json({success,error: "Failed to send message" });
    }
})

router.get('/all_message',async(req,res)=>{
    let success=true
    const Allchat= await MessageSchema.aggregate([
        {
            $match:{
                role:"user"
            }
        }
    ])
    res.status(200).json({success,Allchat})
})

router.get('/get_messages/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversation=await Conversation.find({participants:userId})
        const conversationIds = conversation.map(conv => conv._id);
        const messages = await MessageSchema.find({
            conversationID: { $in: conversationIds }
        }).populate('senderid');
        // console.log(messages)
        res.status(200).json({messages})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Failed to fetch messages" });
    }
});
module.exports = router