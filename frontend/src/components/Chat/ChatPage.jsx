import {React, useState, useEffect } from 'react';
import Channels from './Channels';
import Message from './Message';
import axios from 'axios'
import routes from '../../routes/routes';
import { useDispatch, useSelector, batch } from 'react-redux'
import { addChannels, selectors  } from '../../slices/sliceChannals';
import { addMessages, selectors as messagesSelectors } from '../../slices/sliceMessage';
const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

function ChatPage(){
    const dispatch = useDispatch();
    
   useEffect( ()=>{
    async function getData(){
        const res = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
        console.log(res.data)
        const {channels, messages} = res.data;
        batch(()=>{
            dispatch(addChannels(channels)); 
            dispatch(addMessages(messages)); 
        })
    }
getData()
}, [dispatch])

const dataChannels = useSelector((state) => selectors.selectAll(state));
const dataMessages = useSelector((state) => messagesSelectors.selectAll(state));
const datacurrentID = useSelector((state)=> state.currentChannelId.id);

const forrectMessage = dataMessages.filter((item)=>item.channelId ===datacurrentID)
const correctChat = dataChannels.filter((item)=>item.id===datacurrentID)
const correctChatName= correctChat[0]?.name
    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row"> 
              <Channels channels={dataChannels} currectChannelID={datacurrentID}/>
              <div className="col p-0 h-100">
                <Message message={forrectMessage}
                         currectChannelID={datacurrentID}
                         correctChatName={correctChatName}/>
             </div>
          </div>
        </div> 
    )
}

export default ChatPage