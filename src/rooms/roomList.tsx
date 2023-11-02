import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createRoom, getRooms, Room } from "../firestore/room";
import { useUser } from "../auth/UserContext";
import { Card, CardContent, Typography } from "@mui/material";

function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { user } = useUser();
  const [showCreateTextarea, setShowCreateTextarea] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  const fetchRooms = async () => {
    const roomsData = await getRooms();
    setRooms(roomsData);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = () => {
    setShowCreateTextarea(true);
  };

  const handleCreateRoomSubmit = async () => {
    try {
      // Implement your room creation logic here
      // console.log("New room name:", newRoomName);
      await createRoom(newRoomName);

      // Fetch rooms after creating the new room
      const roomsData = await getRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error("Error creating room:", error);
    }

    // You can reset the state and hide the textarea after creating the room
    setNewRoomName("");
    setShowCreateTextarea(false);
    fetchRooms();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%" }}>
        <h1>Chat Rooms</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {rooms.map((room) => (
          <div
            className="ChatRoom"
            key={room.roomId}
            style={{
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              marginBottom: "20px",
            }}
          >
            <Link to={`/room/${room.roomId}/${room.roomName}`}>
              <Card
                sx={{ minWidth: 275, margin: "0 20px 20px 20px" }}
                style={{ width: "50%" }}
              >
                <CardContent>
                  <Typography
                    variant="h2"
                    fontSize={30}
                    component="div"
                    sx={{ fontSize: 30, fontWeight: "bold" }}
                  >
                    {room.roomName}
                  </Typography>
                  <Typography variant="body2">
                    Click to enter chat room!
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
      {user ? (
        <div>
          {showCreateTextarea ? (
            <div
              style={{
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <textarea
                style={{ width: "50%", height: "50px" }}
                placeholder="Enter room name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
              ></textarea>
              <button onClick={handleCreateRoomSubmit}>Create</button>
            </div>
          ) : (
            <button onClick={handleCreateRoom}>Create Room</button>
          )}
        </div>
      ) : (
        <h1>Register or sign in to join the chat room</h1>
      )}
    </div>
  );
}

export default RoomList;
