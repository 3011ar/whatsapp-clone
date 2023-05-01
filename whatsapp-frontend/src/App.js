import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js' ;
import axios from 'axios';

function App() {

  const [messages ,setMessages] = useState([]) ;
  useEffect( () => {
    axios.get('http://localhost:9000/messages/sync').then( res => {
      // console.log(res.data) ;
      setMessages(res.data) ;
    });
  } , [] ) ;
  //when the app componet loads use it ones
  useEffect( () => {
    const pusher = new Pusher('ba4e871c05884835d1d1', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      // alert(JSON.stringify(data));
      setMessages( [...messages , data ] )
    });

    return () => {
      channel.unbind_all() ;
      channel.unsubscribe() ;
    }
  } ,[messages] ) ;

  console.log(messages) ;
  return (
    <div className="app">
      {/* <h1>Lets build whatsapp clone</h1> */}
      <div className='app_body'>

        {/* Side bar Component */}
        <Sidebar />
        {/* Chat Component */}
        <Chat messages ={messages} /> 

      </div>

    </div>
  );
}

export default App;
