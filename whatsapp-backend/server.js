//importing
import express from 'express' ;
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher' ;
import cors from 'cors' ;
//app config 
const app = express() ;
const port = process.env.PORT || 9000 ;

const pusher = new Pusher({
    appId: "1593045",
    key: "ba4e871c05884835d1d1",
    secret: "eed934f9f78ae2037c22",
    cluster: "ap2",
    useTLS: true
  });

const db = mongoose.connection ;

// {
//     _id: {
//       _data: '8264500C9F000000072B022C0100296E5A1004A94623B2706145C7987C61EEF5BCDC7546645F6964006464500C9BC2BDC05889625C370004'
//     },
//     operationType: 'insert',
//     clusterTime: new Timestamp({ t: 1682967711, i: 7 }),
//     wallTime: 2023-05-01T19:01:51.136Z,
//     fullDocument: {
//       _id: new ObjectId("64500c9bc2bdc05889625c37"),
//       message: 'Yooo this works oh yeahh neww',
//       name: 'RayuSahil',
//       timestamp: 'I m demo timestamp..',
//       received: false,
//       __v: 0
//     },
//     ns: { db: 'whatsappdb', coll: 'messagecontents' },
//     documentKey: { _id: new ObjectId("64500c9bc2bdc05889625c37") }
//   }

db.once('open' ,() => {
    console.log('Db is connected');
    const msgCollection = db.collection("messagecontents") ;
    const changeStream = msgCollection.watch() ;

    changeStream.on('change' , ( change ) => {
        console.log(change) ;
        if( change.operationType === 'insert' ) {
            const messageDetails = change.fullDocument ;
            pusher.trigger('messages','inserted' ,{
                name : messageDetails.name,
                message : messageDetails.message,
                timestamp : messageDetails.timestamp,
                received : messageDetails.received ,
            });
            // console.log('done') ;
        }
        else{
            console.log('Error Triggered in Pusher') ;
        }
    });


});
//middlewares
app.use(express.json());
app.use(cors());

// app.use( (req , res , next ) => {
//     res.setHeader("Acess-Control-Allow-Origin" ,"*" );
//     res.setHeader("Acess-Control-Allow-Headers" ,"*" );
//     next() ;
// })

//db config
const connection_url = 'mongodb+srv://root:root@cluster0.yl8dqjf.mongodb.net/whatsappdb?retryWrites=true&w=majority' ;
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
  });
// ???

//api routes 

app.get('/' , (req,res)=>{
    res.status(200).send('hello world');
});

// app.post('/message/new' , ( req , res ) => {

//     const dbMessage = req.body ;

//     Messages.create(dbMessage , (err , data ) => {
//         if( err ) console.log(  err );
//         else res.status(201).send(`new message created: \n ${data}`) ;
//     })
// })
app.post('/message/new', (req, res) => {
    const dbMessage = req.body;
  
    Messages.create(dbMessage)
      .then(message => {
        res.status(201).send(`New message created: \n ${message}`);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error creating message');
      });
  });
  
  app.get('/messages/sync', (req, res) => {
    Messages.find()
      .then(messages => {
        res.status(200).send(messages);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error retrieving messages');
      });
  });
  

//listen
app.listen( port , (err) => {
    if( err ){
        console.log( err ) ;
    }
    console.log(`Server Started at Port ${port}`) ;
})