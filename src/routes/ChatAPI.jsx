import React, { useContext, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
   Chat,
   Channel,
   ChannelHeader,
   MessageInput,
   MessageList,
   Thread,
   Window,
   LoadingIndicator,
   ChannelList
} from 'stream-chat-react';
import { useClient } from '../hooks/useClient';
import { UserContext } from '../context/UserProvider';
import { useLocation } from 'react-router-dom';

import 'stream-chat-react/dist/css/v2/index.css';

const api_key = import.meta.env.VITE_REACT_APP_STREAM_APIKEY;

export const ChatAPI = () => {
   const [userBook, setUserBook] = useState('');

   const { state } = useLocation();
   const { user } = useContext(UserContext);

   const theme = localStorage.getItem('theme');

   useEffect(() => {
      if (state !== null) {
         setUserBook(state.uidBook);
      } else {
         console.log('no se carga el state.uid');
      }
   }, []);

   let index = user.email.indexOf('@');
   const username = user.email.substring(0, index);
   const initialLetter = username.slice(0, 1).toUpperCase();
   const client = StreamChat.getInstance(api_key);
   const userToken = client.devToken(user.uid);
   const currentUser = {
      id: user.uid,
      name: username,
      image: `https://getstream.imgix.net/images/random_svg/${initialLetter}.svg`
   };

   const filter = { type: 'messaging', members: { $in: [user.uid] }, member_count: 2 };
   const sort = { last_message_at: -1 };

   const chatClient = useClient({
      client,
      apiKey: api_key,
      userData: currentUser,
      tokenOrProvider: userToken
   });

   async function initChannel() {
      if (userBook !== '') {
         const channel = client.channel('messaging', {
            members: [user.uid, userBook]
         });
         await channel.create();
      }
      if (chatClient !== null) {
         const channels = await chatClient.queryChannels(filter, sort, {
            watch: true, // this is the default
            state: true
         });
      }
   }

   initChannel();

   if (!chatClient) {
      return <LoadingIndicator />;
   }

   return (
      <>
         <div className="flex flex-col sm:flex-row">
            <Chat client={chatClient} theme={theme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-ligth'}>
               <ChannelList filters={filter} sort={sort} />
               <Channel>
                  <Window>
                     <ChannelHeader />
                     <MessageList />
                     <MessageInput />
                  </Window>
                  <Thread />
               </Channel>
            </Chat>
         </div>
      </>
   );
};
