import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

export const useClient = ({ client, apiKey, userData, tokenOrProvider }) => {
    const [chatClient, setChatClient] = useState(null);

    useEffect(() => {
        // const client = StreamChat.getInstance(apiKey);
        // const client = new StreamChat(apiKey);
        let didUserConnectInterrupt = false;

        const connectionPromise = client.connectUser(userData, tokenOrProvider).then(() => {
            if (!didUserConnectInterrupt) setChatClient(client);
        });

        return () => {
            didUserConnectInterrupt = true;
            setChatClient(null);
            // wait for connection to finish before initiating closing sequence
            connectionPromise
                .then(() => client.disconnectUser())
                .then(() => {
                    console.log('connection closed');
                });
        };
    }, [apiKey, userData.id, tokenOrProvider]);

    return chatClient;
};
