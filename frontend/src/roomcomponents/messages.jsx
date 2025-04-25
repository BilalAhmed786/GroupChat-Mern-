import React, { useEffect, useRef, useState } from 'react';
import {ChatImage} from './chatimage'; // External image component

const Messages = ({ sock, chatroomid, userid}) => {
 
  const lastMessageRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   
    sock?.emit('joinRoom', { chatroomid, userid });

    sock?.on('message', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'joinleave', message: msg },
      ]);
    });

    sock?.on('roommessage', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'chat', ...msg },
      ]);
    });


    sock?.on('messageDelete',(data)=>{


      setMessages((prev)=>{
         
        return prev.filter((msgs)=>msgs._id !== data._id)

      })

      console.log(data)
    })

    sock?.on('multiplemsgDel',(data)=>{

        const messagesids = data.map((msgs)=>msgs._id)

        setMessages((prev)=>{

          return prev.filter((msg)=> !messagesids.includes(msg._id))
        })


    })

    return () => {

      sock?.emit('leavechat',{chatroomid,userid})
      sock?.off('message');
      sock?.off('roommessage');
      sock?.off('messageDelete');
      sock?.off('multiplemsgDel');
      
    };
  }, [sock, chatroomid, userid]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const isImageUrl = (url) => {
    if (!url) return false;
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    try {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname.toLowerCase();
      return imageExtensions.some(ext => pathname.endsWith(ext));
    } catch (err) {
      return false;
    }
  };


  return (
    <div className="messages-container overflow-auto h-[81vh] p-4 space-y-3">
      {messages.map((msg, index) => (
        <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
          {msg.type === 'joinleave' ? (
            <p className="text-sm text-gray-500 text-center">{msg.message}</p>
          ) : msg.userid && (msg.userid._id === userid || msg.userid === userid) ? (
            <div className="flex justify-end">
              <div className="bg-blue-100 p-3 rounded-lg max-w-[75%]">
                <div className="font-semibold text-sm mb-1">You:</div>
                {isImageUrl(msg.message) ? (
                  <ChatImage src={msg.message} alt="sent-img" lastMessageRef={lastMessageRef} />
                ) : (
                  <p className="text-sm">{msg.message}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg max-w-[75%]">
                <div className="font-semibold text-sm mb-1">{msg.name || 'User'}:</div>
                {isImageUrl(msg.message) ? (
                  <ChatImage src={msg.message} alt="received-img" lastMessageRef={lastMessageRef} />
                ) : (
                  <p className="text-sm">{msg.message}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
