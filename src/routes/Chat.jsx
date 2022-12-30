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
// import { useClient } from '../hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';
import { UserContext } from '../context/UserProvider';
import { useUsers } from '../hooks/useUsers';

const api_key = import.meta.env.VITE_REACT_APP_STREAM_APIKEY;
const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicCJ9.eX_SnzrSuWUpfwm42ySQrqdQEidQxgvYaMHQtYbdn8';

const ChatStream = () => {
    // const [currentUser, setCurrentUser] = useState('');
    const [chatClient, setChatClient] = useState(null);
    console.log('chatClient', chatClient);
    const { user } = useContext(UserContext);
    // const { users, getUsers } = useUsers();

    useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance(api_key);
            const token = client.devToken(`spanioulis`);
            const username = user.email.replace(/([^a-z0-9_-]+)/gi, '_');
            console.log('username', username);
            const initialLetter = username.slice(0, 1).toUpperCase();
            console.log('initialLetter', initialLetter);

            await client.connectUser(
                {
                    id: `spanioulis`
                    // name: `${username}`,
                    // image: `https://getstream.imgix.net/images/random_svg/${username}.svg`
                },
                token
            );
            setChatClient(client);
            chatClient && console.log(chatClient);
        };

        try {
            initChat();
        } catch (e) {
            console.log(e);
        }

        //TODO - create Channel en este mismo useEffect
        /* 
        ? Primero se comprueba si el canal está creado o no (https://getstream.io/chat/docs/javascript/query_channels/?language=javascript#query-parameters)
        * Haremos un condicional: si NO está creado, se crea (channel.create()), pero si está creado se filtra y ya está
        */
        // const createChannel = async () => {
        //     const client = StreamChat.getInstance(api_key);
        //     //! ¿Necesario el ID del channel?
        // const channel = client.channel('messaging', {
        //     image: 'Carátula del libro',
        //     members: [`spanoulis`, 'tommaso']

        //
        //         //TODO - Welcome message ¿?
        //         // message: {
        //         //     text: 'Mensaje de bienvenida'
        //         // }
        //     });
        //     await channel.watch();
        //     console.log('Creando channel...');
    }, []);

    useEffect(() => {
        return async () => {
            chatClient && chatClient.disconnectUser();
            console.log('...DISCONNECT', chatClient);
        };
    }, [chatClient]);

    if (!chatClient) return null;
    // if (!chatClient) {
    //     return <LoadingIndicator />;
    // }
    // if (currentUser === '' && users.length > 0) {
    //     users.filter((item) => item.uid === user.uid && setCurrentUser(item.username));
    //     // console.log('¿Cuántas veces?');
    // }

    //TODO - queryChannels
    const filter = { type: 'messaging', members: { $in: [`spanioulis`] } };
    const sort = [{ last_message_at: -1 }];
    //     const channels = await client.queryChannels(filter, sort, { watch: true }); //! ¿Añadir {state: true}?
    //     console.log('Filtrando channels...');
    //     channels.map((channel) => console.log(channel.data.name, channel.cid));
    // };
    // createChannel();

    return (
        <>
            <h1>{user.uid}</h1>
            {/* TODO -> Change light or dark theme */}
            <div className="flex my-10">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                    <ChannelList filter={filter} sort={sort} />
                    {/* <ChannelList /> */}
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

export default ChatStream;
