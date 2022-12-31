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
// import { useUsers } from '../hooks/useUsers';

import 'stream-chat-react/dist/css/v2/index.css';

const api_key = import.meta.env.VITE_REACT_APP_STREAM_APIKEY;

const ChatStream = () => {
    // TODO -> Hacer llegar la 'uid' del usuario del libro en cuestión
    const { user } = useContext(UserContext);
    const username = user.email.replace(/([^a-z0-9_-]+)/gi, '_');
    const initialLetter = username.slice(0, 1).toUpperCase();
    console.log('initialLetter', initialLetter);
    const client = StreamChat.getInstance(api_key);
    //* `${user.uid}`
    const userToken = client.devToken(user.uid);

    const currentUser = {
        id: user.uid,
        name: username,
        image: `https://getstream.imgix.net/images/random_svg/${initialLetter}.svg`
    };

    const filters = { type: 'messaging', members: { $in: [user.uid] } };
    const sort = { last_message_at: -1 };

    const chatClient = useClient({
        client,
        apiKey: api_key,
        userData: currentUser,
        tokenOrProvider: userToken
    });

    //TODO - Create o filter channels
    // const channel = client.channel('messaging', 'uid', {
    //     members: [`${user.uid}`, `uid del libro en cuestión`]
    // });
    // filtro de 2 miembros

    if (!chatClient) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <Chat client={chatClient} theme="str-chat__theme-light">
                <ChannelList filters={filters} sort={sort} />
                <Channel>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </>
    );
};

export default ChatStream;
