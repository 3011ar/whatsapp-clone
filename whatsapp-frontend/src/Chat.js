import React, { useState } from 'react'
import "./Chat.css"
import { Avatar ,IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import axios from 'axios';
function Chat({messages}) {

  const [input , setInput ] = useState("") ;
    const sendMessage = async (e) => {
      e.preventDefault() ;

      await axios.post('http://localhost:9000/message/new' , {
        message : input ,
        name : "Test_User" ,
        timestamp : "Just now",
        received : false,
      });
      setInput("") ;
    };

  return (
    <div className='chat'>
      <div className='chat_header'>
      <Avatar src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'/>
        <div className='chat_headerInfo'>
            <h3>Room Name</h3>
            <p>Last Seen at...</p>
        </div>
        <div className='chat_headerRight'>
            <IconButton >
                <SearchOutlined/>
            </IconButton>
            <IconButton >
                <MoreVertIcon/>
            </IconButton>
            <IconButton >
                <AttachFile/>
            </IconButton>
        </div>
      </div>

      <div className='chat_body'>
        {messages.map((message) => (
          <p className={`chat_message ${message.received && 'chat_reciever'}`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'> {message.timestamp}</span>
          </p>
        ))}


        {/* <p className='chat_message chat_reciever'>
            <span className='chat_name'>Sahil Rayu</span>
            This is a maessage 
            <span className='chat_timestamp'> {new Date().toUTCString()}</span>
        </p> */}

        
      </div>
      <div className='chat_footer'>
        <InsertEmoticon />
        <form>
            <input value = {input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type='text' />
            <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
