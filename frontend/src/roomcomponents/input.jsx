import React, { useEffect, useRef, useState } from 'react';
import { BsFillSendFill, BsPaperclip } from 'react-icons/bs';
import axios from 'axios'

const Input = ({ sock, chatroomid, userid }) => {
  const chatform = useRef();
  const fileInputRef = useRef();

  const [chatmessage, setChatmessage] = useState('');

  const handleInputChange = (e) => {
    setChatmessage(e.target.value);
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click(); // trigger hidden file input
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For now, just log the file (you can upload/send it as needed)
    const formdata = new FormData()

    formdata.append('file', file)
    formdata.append('chatroomid', chatroomid)
    formdata.append('userid', userid)

    try {

      const result = await axios.post('/api/upload', formdata)

      if (result.data) {

        sock?.emit('chatmessage',
          {
            chatmessage: result.data.fileUrl,
            chatroomid: result.data.chatroomid,
            userid: result.data.userid
          });
        setChatmessage('');
        chatform.current.value = '';
      }



    } catch (error) {
      console.log(error)
    }
    // Example: you can emit file data using FormData or send via backend API
    // sock.emit('filemessage', { file, chatroomid, userid });
  };

  const messageHandle = (e) => {
    e.preventDefault();
    if (!chatmessage) return

    if (chatmessage.trim()) {
      sock?.emit('chatmessage', { chatmessage, chatroomid, userid });
      setChatmessage('');
      chatform.current.value = '';
    }
  };

  return (
    <form 
    ref={chatform}
    onSubmit={messageHandle}>
      <div className='input'>
        <input
          className='inputarrea'
          type='text'
          value={chatmessage}
          placeholder='Type message...'
          onChange={handleInputChange}
        />
        <input
          type='file'
          name='file'
          ref={fileInputRef}
          className='hidden'
          onChange={handleFileChange}
          accept='image/png, image/jpeg' // or any file types you want
        />
        <div className='wrapersend'>
          <button type='submit'>
            <BsFillSendFill className='block mt-2 mr-6 text-red-600' size={24} />
          </button>
          <BsPaperclip
            onClick={handleFileClick}
            className='paperclip cursor-pointer'
          />
        </div>
      </div>
    </form>
  );
};

export default Input;
