import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './sidebarnavmenu';
import Headers from './headers';
import Footer from './footer';
const AddRoomForm = () => {

    const formRef = useRef(null);
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('/api/admin/createroom', { roomName, description })

            if (response.data) {


                toast.success(response.data)


            }


            setRoomName('');
            setDescription('');
            formRef.current.reset();

        } catch (error) {

            if (error) {

                toast.error(error.response.data)
            }
        }


    };

    return (

        <>
         <Headers />
        <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
        <div className="mx-auto mt-10 p-6 bg-white">
            <h2 className="text-2xl text-gray-700 text-center font-bold mb-4">Add New Room</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold -mb-10" htmlFor="roomName">
                        Room Name
                    </label>    
                    <input
                        type="text"
                        id="roomName"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="shadow appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter room name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter room description"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 w-full m-auto text-sm text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Room
                    </button>
                </div>
            </form>
        </div>
        </div>
      </div>
      <Footer />
        </>
    );
};

export default AddRoomForm;
