// import mongoose from "mongoose";

// const whatsappSchema = mongoose.Schema({
//     message : String ,
//     name : String , 
//     timestamp : String ,
//     received : Boolean
// });

// export default mongoose.model('messageContent' , whatsappSchema ) ;

import { Schema, model } from "mongoose";

const whatsappSchema = new Schema({
    message : String ,
    name : String , 
    timestamp : String ,
    received : Boolean
});

//connection
export default model('messagecontent' , whatsappSchema ) ;
