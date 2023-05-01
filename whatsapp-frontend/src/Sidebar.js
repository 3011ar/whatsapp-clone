import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar , IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
function Sidebar() {
  return (
    <div className='sidebar'>

      <div className='sidebar_header'>
        <Avatar src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'/>
        <div className='sidebar_headerRight'>
            <IconButton >
                <DonutLargeIcon/>
            </IconButton>
            <IconButton >
                <MoreVertIcon/>
            </IconButton>
            <IconButton >
                <ChatIcon/>
            </IconButton>
        </div>
      </div>

        <div className='sidebar_search'>
            <div className='sidebar_searchContainer'>
                <SearchOutlined />
                <input placeholder='Search or start new chat' type='text'/>
            </div>
        </div>

        <div className='sidebar_chats'>
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />            
        </div>
        
    </div>
  )
}

export default Sidebar
