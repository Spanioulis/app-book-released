import { useMessageContext } from 'stream-chat-react';
//! ¿Implementar?

const CustomChannelPreview = (props) => {
    const { channel, setActiveChannel } = props;

    const { messages } = channel.state;
    const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

    return (
        <div onClick={() => setActiveChannel(channel)} style={{ margin: '12px' }}>
            <div>{channel.data.name || 'Unnamed Channel'}</div>
            <div style={{ fontSize: '14px' }}>{messagePreview}</div>
        </div>
    );
};

const CustomMessage = () => {
    const { message } = useMessageContext();

    return (
        <div>
            <b style={{ marginRight: '4px' }}>{message.user.name}</b> {message.text}
        </div>
    );
};

export { CustomChannelPreview, CustomMessage };
