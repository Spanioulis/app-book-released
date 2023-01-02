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
import { useLocation } from 'react-router-dom';

const api_key = import.meta.env.VITE_REACT_APP_STREAM_APIKEY;

const ChatStream = () => {
    const [userBook, setUserBook] = useState('');
    const { state } = useLocation();
    // console.log('State', state);
    const { user } = useContext(UserContext);

    //* Recuperando información usuario del libro
    useEffect(() => {
        if (state !== null) {
            setUserBook(state.uidBook);
            console.log('Ahora sí se carga el state -> ', state);
        } else {
            console.log('no se carga el state.uid');
        }
    }, []);
    // useEffect(() => {
    //     //TODO -> Aquí irán los filtros de si hay un chat creado o no (¿?), y todo dependiendo de si es una creación de chat nueva o no...(dependerá del título del libro y 'uid'!!! NO solo de la 'uid')
    //     // if (userBook === '') {
    //     //     console.log('Entra por 1a vez con string vacío...');
    //     // } else if (userBook !== '') {
    //     //     console.log(
    //     //         'SOLO ENTRA SI HAY "UID!!!!" Aquí irá la creación o comprobación de nuevo canal!!'
    //     //     );
    //     // } else {
    //     //     console.log('Entra ahora que sí ha cambiado');
    //     // }
    // }, [userBook]);

    // const username = user.email.replace(/([^a-z0-9_-]+)/gi, '_');
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

    //TODO - Create o filter channels
    //* El canal se debe crear cuando ya esté cargado el 'uid' (userBook con información), para poder ponerlo como miembro

    async function initChannel() {
        // Creando channel...
        if (userBook !== '') {
            // console.log('state ->', state);
            // console.log('userBook con información ->', userBook);
            const channel = client.channel('messaging', {
                members: [user.uid, userBook]
                // name: state.title
            });
            await channel.create();
        }
        // else {
        //     console.log('Entrando desde icono Chat, state es ->', state);
        // }

        // Si hay conexión confirmada...
        if (chatClient !== null) {
            const channels = await chatClient.queryChannels(filter, sort, {
                watch: true, // this is the default
                state: true
            });
            channels.map((channel) => {
                console.log('Channel Info -> ', channel, channel.cid);
            });
        }
        // else {
        //     console.log('ChatCLient es NULL de momento');
        // }
    }

    initChannel();

    // if (userBook === '') {
    //     console.log('Entra por 1a vez con string vacío...');
    // } else if (userBook !== '') {
    //     console.log(
    //         'SOLO ENTRA SI HAY "UID!!!!" Aquí irá la creación o comprobación de nuevo canal!!'
    //     );
    // } else {
    //     console.log('Entra ahora que sí ha cambiado');
    // }

    // const channel = client.channel('messaging', 'uid', {
    //     members: [`${user.uid}`, `uid del libro en cuestión`]
    // });
    // filtro de 2 miembros

    if (!chatClient) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <div className="flex">
                <Chat client={chatClient} theme="str-chat__theme-light">
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

export default ChatStream;
