import { createContext, useState } from "react";
import { io } from "socket.io-client";

// Create the socket connection
const sock = io("http://localhost:4000");

// Create and export the context
export const SocketContext = createContext();

const Contextapi = ({ children }) => {
 

  return (
    <SocketContext.Provider value={{ sock }}>
      {children}
    </SocketContext.Provider>
  );
};

export default Contextapi;
