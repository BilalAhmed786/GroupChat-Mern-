import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const sock = io('http://localhost:4000')
// Create context
export const SocketContext = createContext();

const Contextapi = ({ children }) => {
  
  return (
    <SocketContext.Provider value={{ sock }}>
      {children}
    </SocketContext.Provider>
  );
};

export default Contextapi;
