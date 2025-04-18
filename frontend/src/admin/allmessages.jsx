import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from './sidebarnavmenu';
import Headers from './headers';
import Footer from './footer';
import axios from 'axios';
import { BsPencil, BsTrash,BsEye } from 'react-icons/bs';
import { toast } from 'react-toastify';
import messages from '../roomcomponents/messages';

const Allmessages = () => {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedItems, setSelectedItems] = useState(0);
    const [magicform, setMagicform] = useState(true);
    const [updateData, setUpdateData] = useState('');
    const [searchUsers, setSearchRoom] = useState('');
    const [viewmessage, viewMessage] = useState({message:''});


 
    const editchangehandler = ({ message }) => {
        viewMessage({ message });
        setMagicform(magicform => !magicform);
    };

   

    const handleDelete = async (id) => {
      
        try {
            const res = await axios.delete(`/api/admin/deletemessage/${id}`);
            
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

    const handlemultiitemDelete = (e) => {

        e.preventDefault()      
        const ids = selectedRows.map(row => row._id);

      
        axios.post('/api/admin/multiplemessagesdel', ids)
            
            .then((res) => {
                
                setUpdateData(res.data);
                toast.success(res.data);

                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    };

    useEffect(() => {
        axios.get(`/api/admin/allmessages?search=${searchUsers}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchUsers, updateData]);

    const columns = [
        {
            name: 'UserName',
            selector: (row) => row.user.username,
            sortable: true,
        },
        {
            name: 'Message',
            selector: (row) => row.message,
            sortable: true,
        },
        {
            name: 'Room',
            selector: (row) => row.room.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex cursor-pointer'>
                    <a style={{ marginRight: 20 }} onClick={() => editchangehandler({ message:row.message })}><BsEye /></a>
                    <BsTrash onClick={() => handleDelete(row._id)} />
                </div>
            ),
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
                            onChange={(e) => setSearchRoom(e.target.value)}
                        />
                    </div>
                    {data && data.length > 0 && (
                        <div className='text-left flex ml-5'>
                            <a className='cursor-pointer' onClick={handlemultiitemDelete}>Delete Selected</a>
                            <div>({selectedItems})</div>
                        </div>
                    )}
                    <div className='relative'>
                        <div className='block text-center overflow-auto'>
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                                highlightOnHover
                                selectableRows
                                selectableRowsHighlight
                                onSelectedRowsChange={handleRowSelected}
                                
                            />
                        </div>
                        <div style={{ display: magicform ? 'none' : 'block' }} className='absolute top-24 left-20 bg-slate-100 p-10 rounded'>
                           
                                <a
                                    className='w-5 h-5 cursor-pointer text-xxxs float-right -mt-8 -mr-8 bg-red-500 text-white font-bold rounded-full flex items-center justify-center hover:bg-red-700 focus:outline-none'
                                    onClick={() => setMagicform(true)}
                                >X</a>
                                <p className='outline-0 p-2 m-2 text-black text-center overflow-auto h-12 w-80'>
                                    {viewmessage.message}
                                </p>
                            
                                
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Allmessages;
