import { useState } from "react";

export const useRoomManagment = () => {
  const [currentRoom, setRoom] = useState<string>("default");

  return { currentRoom, setRoom };
};
