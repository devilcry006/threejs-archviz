import { useState } from "react";

export const useRoomManagement = () => {
  const [currentRoom, setRoom] = useState<string>("default");

  return { currentRoom, setRoom };
};
