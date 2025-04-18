import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from './sidebarnavmenu';
import Headers from './headers';
import Footer from './footer';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Blockusers = () => {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedItems, setSelectedItems] = useState(0);
    const [updateData, setUpdateData] = useState('');
    const [searchUsers, setSearchUsers] = useState('');
 

    const handleDelete = async (id) => {
       
        try {
            const res = await axios.delete(`/api/admin/deleteblockuser?id=${id}`);
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
        axios.post('/api/admin/multipleblockusersdel', ids)
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
        axios.get(`/api/admin/blockuser?search=${searchUsers}`)
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
            selector: (row) => row.user.username,
            sortable: true,
            width: '200px',
        },
        {
            name: 'RoomName',
            selector: (row) => row.roomname,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Email',
            selector: (row) => row.user.email,
            sortable: true,
            width: '250px',
        },
        {
            name: 'Role',
            selector: (row) => row.user.role,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex cursor-pointer'>
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
                <div className="flex-1 mt-5">
                    <h1 className='block w-9/12 text-center font-semibold mt-5 text-black text-xl'>Black List Users</h1>
                    <div className='searchproduct flex justify-center text-sm my-4'>
                        <input
                            className='block w-1/3 outline-0 h-12 text-black m-auto'
                            type="text"
                            placeholder='Search user'
                            onChange={(e) => setSearchUsers(e.target.value)}
                        />
                    </div>
                    {data.length > 0 && (
                        <div className='flex justify-start items-center mb-4 px-8'>
                            <a className='cursor-pointer text-red-600 text-sm' onClick={handlemultiitemDelete}>Delete Selected</a>
                            <div className='text-sm'>({selectedItems})</div>
                        </div>
                    )}
                    <div className='px-8'>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                            selectableRows
                            selectableRowsHighlight
                            onSelectedRowsChange={handleRowSelected}
                            className='block w-full text-sm'
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Blockusers;
