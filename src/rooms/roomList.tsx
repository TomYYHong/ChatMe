import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createRoom, getRooms, Room } from "../firestore/room";
import { useUser } from "../auth/UserContext";

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
      console.log("New room name:", newRoomName);
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
  };

  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.roomId}>
            <Link to={`/room/${room.roomId}`}>{room.roomName}</Link>
          </li>
        ))}
      </ul>
      {user ? (
        <div>
          {showCreateTextarea ? (
            <div>
              <textarea
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
      ) : null}
    </div>
  );
}

export default RoomList;
