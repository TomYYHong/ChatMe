import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { firestore } from "./firestoreConfig";

export type Room = {
  roomId: string;
  roomName: string; 
}

export type ChatHistory = {
  chatId: string;
  message: string;
  sendTime: {
    seconds: number;
    nanoseconds: number;
  };
  userId: string;
  userDisplayName: String
}


const collectionName = 'chatRoom';

export const sendMessage = async (roomId: string, message: string, userId: string, userDisplayName: string) => {
  try {
    await addDoc(collection(firestore, "chatRoom", roomId, "chatHistory"), {
      message,
      sendTime: new Date(),
      userId,
      userDisplayName,
    });
  } catch (error) {
    console.error(error);
  }
};


export const getMessages = async (roomId:string) => {
  const messages : ChatHistory[] = [];
  try {
      const chatHistoryCollectionRef = collection(firestore, "chatRoom", roomId, "chatHistory");
      const chatHistoryQuerySnapshot = await getDocs(chatHistoryCollectionRef);
      chatHistoryQuerySnapshot.forEach((chatHistoryDoc) => {
        messages.push({ chatId: chatHistoryDoc.id,...chatHistoryDoc.data() } as ChatHistory);
        
      });
  } catch (error) {
    console.error(error);
  }
  console.log("message: ",messages)
  return messages;
};

export const getRooms = async () => {
  const rooms: Room[] = [];
  try {
    const queryToSearch = query(collection(firestore, collectionName));
    const querySnapshot = await getDocs(queryToSearch);

    for (const doc of querySnapshot.docs) {
      const chatRoomData = doc.data() as Room;
      const chatRoomId = doc.id;

      rooms.push({
        roomId: chatRoomId,
        roomName: chatRoomData.roomName,
      });
    }

    console.log("rooms: ", rooms);
  } catch (error) {
    console.error(error);
  }
  return rooms;
}

export const createRoom = async (roomName:string) => {
  try {
    await addDoc(collection(firestore, "chatRoom"), {
      roomName
    });
  } catch (error) {
    console.error(error);
  }
};
