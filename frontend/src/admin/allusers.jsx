import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from './sidebarnavmenu';
import Headers from './headers';
import Footer from './footer';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Select from 'react-select';
import Switch from 'react-switch';

const Allusers = () => {
    const [data, setData] = useState({ users: [], rooms: [] });
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedItems, setSelectedItems] = useState(0);
    const [magicform, setMagicform] = useState(true);
    const [updateData, setUpdateData] = useState('');
    const [searchUsers, setSearchUsers] = useState('');
    const [blockedUsers, setBlockedUsers] = useState({});
    const [editusers, setEditusers] = useState({ name: '', email: '', role: '', id: '' });
    const [selectedRoom, setSelectedRoom] = useState({});
console.log(selectedRoom)
    const formhandler = (e) => {
        const { name, value } = e.target;
        setEditusers({
            ...editusers,
            [name]: value
        });
    };

    const editchangehandler = ({ name, email, role, id }) => {
        setEditusers({ name, email, role, id });
        setMagicform(magicform => !magicform);
    };

    const editformhandle = (e) => {
        e.preventDefault();
        axios.post('/api/admin/edituser', editusers)
            .then((res) => {
                setUpdateData(res.data);
                toast.success(res.data);
                setMagicform(true); // Close the edit form
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/admin/deleteuser/${id}`);
            setUpdateData(res.data);
            toast.success(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRowSelected = (rows) => {
        setSelectedRows(rows.selectedRows);
        setSelectedItems(rows.selectedCount);
    };

    const handlemultiitemDelete = () => {
        const ids = selectedRows.map(row => row._id);
        axios.post('/api/admin/multipleusersdel', ids)
            .then((res) => {
                setUpdateData(res.data);
                toast.success(res.data);
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    };

    const handleBlockToggle = async (userId, roomName, isBlocked) => {
        console.log(userId,roomName,isBlocked)
        try {
              const response =  await axios.post('/api/admin/blockuser', { userId, roomName, isBlocked });
            setBlockedUsers(prevState => ({
                ...prevState,
                [userId]: {
                    ...prevState[userId],
                    [roomName]: isBlocked,
                }
            }));
            
            toast.success(response.data)
            // toast.success(`${isBlocked ? 'Blocked' : 'Unblocked'} user in ${roomName}`);
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        axios.get(`/api/admin/register?search=${searchUsers}`)
            .then((res) => {
                setData(res.data); // Ensure response is set correctly
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchUsers, updateData]);

    const columns = [
        {
            name: 'UserName',
            selector: (row) => row.username,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
            width: '250px',
        },
        {
            name: 'Role',
            selector: (row) => row.role,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Block/Unblock',
            cell: row => (
                <div className='flex items-center'>
                    <Select
                        options={data.rooms.map(room => ({ value: room.name, label: room.name }))}
                        onChange={(selectedOption) => setSelectedRoom({ [row._id]: selectedOption.value })}
                        placeholder="Select a chatroom"
                        width="200px"
                    />
                    <Switch
                        onChange={(checked) => handleBlockToggle(row._id, selectedRoom[row._id], checked)}
                        checked={blockedUsers[row._id]?.[selectedRoom[row._id]] || false}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={30}
                        className="ml-2"
                    />
                </div>
            ),
            width: '300px',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex cursor-pointer'>
                    <a style={{ marginRight: 20 }} onClick={() => editchangehandler({ name: row.username, email: row.email, role: row.role, id: row._id })}><BsPencil /></a>
                    <BsTrash onClick={() => handleDelete(row._id)} />
                </div>
            ),
            width: '150px',
        },
    ];

    return (
        <>
            <Headers />
            <div className="flex">
                <Sidebar />
                <div className="text-sm w-1/2 m-auto mt-5">
                    <h1 className='block font-semibold mt-5 text-black ml-48'>Users</h1>
                    <div className='searchproduct flex'>
                        <input
                            className='w-full outline-0 h-12 ml-8 text-black'
                            type="text"
                            placeholder='Search user'
                            onChange={(e) => setSearchUsers(e.target.value)}
                        />
                    </div>
                    {data.users.length > 0 && (
                        <div className='text-left flex ml-5'>
                            <a className='cursor-pointer' onClick={handlemultiitemDelete}>Delete Selected</a>
                            <div>({selectedItems})</div>
                        </div>
                    )}
                    <div className='relative'>
                        <div className='block text-center'>
                            <DataTable
                                columns={columns}
                                data={data.users}
                                pagination
                                highlightOnHover
                                selectableRows
                                selectableRowsHighlight
                                onSelectedRowsChange={handleRowSelected}
                            />
                        </div>
                        <div style={{ display: magicform ? 'none' : 'block' }} className='absolute top-0 left-20 bg-slate-100 p-10 rounded'>
                            <form onSubmit={editformhandle}>
                                <a
                                    className='w-5 h-5 cursor-pointer text-xxxs float-right -mt-8 -mr-8 bg-red-500 text-white font-bold rounded-full flex items-center justify-center hover:bg-red-700 focus:outline-none'
                                    onClick={() => setMagicform(true)}
                                >X</a>
                                <input
                                    className='w-full h-7 outline-0 p-2 m-2 text-black text-center'
                                    name='name'
                                    type='text'
                                    value={editusers.name}
                                    onChange={formhandler}
                                /><br />
                                <input
                                    className='w-full h-7 outline-0 p-2 m-2 text-black text-center'
                                    name='email'
                                    type='text'
                                    value={editusers.email}
                                    onChange={formhandler}
                                /><br />
                                <input
                                    className='w-full h-7 outline-0 p-2 m-2 text-black text-center'
                                    name='role'
                                    type='text'
                                    value={editusers.role}
                                    onChange={formhandler}
                                /><br />
                                <input
                                    className='w-full h-7 outline-0 p-2 m-2 text-black'
                                    name='id'
                                    type='hidden'
                                    value={editusers.id}
                                    onChange={formhandler}
                                /><br />
                                <button type="submit" className='block bg-red-600 text-white p-1 mt-4 rounded w-1/2 m-auto text-xs'>Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Allusers;
