import React from 'react'
import "./SidebarChat.css";
import { Avatar } from '@material-ui/core';
function SidebarChat() {
  return (
    <div className='sidebarChat'>
      <Avatar src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'/>
      <div className='sidebarchat_info'>
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  )
}

export default SidebarChat
