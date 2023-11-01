import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatHistory, getMessages, sendMessage } from "../firestore/room";
import { useUser } from "../auth/UserContext";

function Room() {
  const { roomId } = useParams();
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatHistory[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (roomId) {
      const messagesData = await getMessages(roomId);
      setMessages(messagesData);
    } else {
      console.log("message room id is not definded!");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const handleSendMessage = async () => {
    if (newMessage && roomId && user) {
      await sendMessage(roomId, newMessage, user.userId, user.displayName); // Make sure userId is defined
      setNewMessage("");
      fetchMessages();
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((message) => (
          <div key={message.chatId}>
            {message.userId}
            {message.message}
            {message.sendTime.seconds && (
              <div>
                {new Date(message.sendTime.seconds * 1000).toLocaleString()}
              </div>
            )}
          </div>
        ))}
        {user ? (
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Room;
