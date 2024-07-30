import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const socket = io.connect("http://localhost:2024");

const Discussion = () => {
    const [sentMessage, setSentMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const discussionId = 'default-discussion'; // Use your discussion ID here

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:2024/discussions/${discussionId}`);
            setReceivedMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();

        const handleMessage = (message) => {
            setReceivedMessages(prevMessages => [...prevMessages, message]);
        };

        socket.on('receiveMessage', handleMessage);

        return () => {
            socket.off('receiveMessage', handleMessage);
        };
    }, []);

    const sendMessage = async () => {
        if (sentMessage.trim()) {
            const message = { user: 'User', message: sentMessage };
            try {
                await axios.post(`http://localhost:2024/discussions/${discussionId}`, message);
                socket.emit('sendMessage', message);
                setSentMessage("");
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-xl mx-auto p-4 bg-gray-200">
            <div className="flex-1 bg-white border rounded-lg p-4 overflow-y-auto">
                {receivedMessages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <strong>{msg.user || 'User'}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center">
                <input
                    placeholder="Type your message..."
                    value={sentMessage}
                    onChange={(e) => setSentMessage(e.target.value)}
                    className="flex-1 p-2 border border-gray-400 rounded-lg"
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Discussion;
