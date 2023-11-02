import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatHistory, getMessages, sendMessage } from "../firestore/room";
import { useUser } from "../auth/UserContext";

function Room() {
  const { roomId, roomName } = useParams();
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <h2>{roomName}</h2>
        <div style={{ width: "100%" }}>
          {messages.map((message) => {
            const isCurrentUser = message.userId === user?.userId;
            const backgroundColor = isCurrentUser ? "#2979ff" : "#f1f1f1"; // Customize colors
            const marginLeft = isCurrentUser ? "auto" : 0;
            const marginRight = isCurrentUser ? 0 : "auto";
            // console.log(
            //   "isCurrentUser: ",
            //   isCurrentUser,
            //   "message.userId: ",
            //   message.userId,
            //   "user?.userId: ",
            //   user?.userId
            // );

            return (
              <div
                key={message.chatId}
                style={{
                  backgroundColor: backgroundColor,
                  marginLeft: marginLeft,
                  marginRight: marginRight,
                  width: "30%",
                  marginBottom: "20px",
                }}
              >
                <h4>{message.userDisplayName}</h4>
                <h2>{message.message}</h2>
                {message.sendTime.seconds && (
                  <div>
                    {new Date(message.sendTime.seconds * 1000).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
          {user ? (
            <div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ width: "70%", height: "30px" }}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Room;
