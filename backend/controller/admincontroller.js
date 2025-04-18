import Message from "../models/message.js";
import ChatRoom from "../models/chatroom.js"
import roomuser from "../models/roomusers.js"
import User from "../models/users.js";
import Blockuser from "../models/blockuser.js";




export const roomcreate = async (req, res) => {
    const { roomName, description } = req.body

    if (!roomName) {

        return res.status(400).json('Room name required')
    }


    try {

        const findroom = await ChatRoom.findOne({ name: roomName })

        if (findroom) {


            return res.status(400).json('Room already exist')


        }

        const roomcreate = ChatRoom({ name: roomName, description })

        const roomcreated = await roomcreate.save()


        if (roomcreated) {



            return res.json('room creates successfully')

        }



    } catch (error) {

        console.log(error)
    }

}
export const getroomcreate = async (req, res) => {

    const { search } = req.query


    try {

        const query = { name: { $regex: new RegExp(search, 'i') } }

        const rooms = await ChatRoom.find(query)

        console.log(rooms)

        return res.json(rooms)

    } catch (error) {

        console.log(error)
    }


}

export const roomusers = async (req, res) => {

    try {


        const roomusers = await roomuser.find().populate('room')

        if (roomusers.length > 0) {

            res.json(roomusers)

        }


    } catch (error) {

        console.log(error)
    }

}


export const roomedit = async (req, res) => {


    const { name, id } = req.body

    if (!name) {

        return res.status(400).json("field requried")
    }

    try {

        const updateroom = await ChatRoom.findByIdAndUpdate(id, { name })

        if (updateroom) {

            return res.json("update successfully")

        }


    } catch (error) {

        console.log(error)
    }


}


export const deleteroom = async (req, res) => {

    const { id } = req.params

    try {

        const chatroom = await ChatRoom.findByIdAndDelete(id)

        if (chatroom) {

            await Message.deleteMany({ room: id })

            return res.json('delete successfully')
        }


    } catch (error) {


        console.log(error)


    }


}

export const multiitemdel = (req, res) => {

    const roomsid = req.body

    if (roomsid.length === 0) {


        return res.status(400).json('u didnt select any row')

    }

    ChatRoom.deleteMany({ _id: { $in: roomsid } })

        .then(() => {

            res.json('deleted success fully')

        })
        .catch((error) => {

            console.log(error)

        })


    Message.deleteMany({ room: { $in: roomsid } })

        .then(() => {

            console.log('selected room message deleted')

        })
        .catch((error) => {

            console.log(error)

        })


}

export const allusers = async (req, res) => {

    const { search } = req.query

    const query = {

        $or: [


            { username: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } },
            { role: { $regex: new RegExp(search, 'i') } },

        ]
    }


    try {

        // const usersroom =[];
        //users table
        const users = await User.find(query, { password: 0, retypepassword: 0 })

        //rooms table
        const rooms = await ChatRoom.find()
        // usersroom.push(users)



        const usersroom = {

            users: users,
            rooms: rooms
        }




        console.log(usersroom)
        return res.json(usersroom)
    } catch (error) {

        console.log(error)
    }



}


export const edituser = async (req, res) => {

    const { name, email, role, id } = req.body

    if (!name || !email || !role) {

        return res.status(400).json('All fields required')

    }

    try {


        const updateuser = await User.findByIdAndUpdate(id, { username: name, email, role })


        if (updateuser) {

            console.log(updateuser)

            return res.json('updated successfuly')
        }


    } catch (error) {

        console.log(error)
    }



}


export const deleteuser = (req, res) => {

    const { id } = req.params

    console.log(id)

    User.findByIdAndDelete(id)

        .then((result) => {

            console.log(result);

            return res.json('user deleted successfully')

        })
        .catch((error) => {

            console.log(error)
        })
}


export const multideleteuser = (req, res) => {


    const ids = req.body

    if (ids.length === 0) {


        return res.status(400).json('u didnot select any row')
    }

    User.deleteMany({ _id: { $in: ids } })
        .then(() => {

            res.json('deleted successfully')

        })
        .catch((error) => {

            console.log(error)
        })


}


export const allmessages = async (req, res) => {

    const { search } = req.query
    try {
        const rooms = await ChatRoom.find({ name: { $regex: new RegExp(search, 'i') } });
        const users = await User.find({ username: { $regex: new RegExp(search, 'i') } });

        const roomIds = rooms.map(room => room._id);
        const userIds = users.map(user => user._id);

        // Step 2: Construct the query using $or and $regex
        const query = {
            $or: [
                { message: { $regex: new RegExp(search, 'i') } },
                { room: { $in: roomIds } },
                { user: { $in: userIds } }
            ]
        };

        // Execute the query with population
        const messages = await Message.find(query).populate('room').populate('user');

        res.json(messages);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
    }


}


export const deletemessage = (req, res) => {


    const { id } = req.params

    console.log(id)
    Message.findByIdAndDelete(id)

        .then(() => {

            console.log('deleted')

            return res.json('message deleted successfully')
        })

        .catch((error) => {

            console.log(error)
        })


}

export const multidelmessage = (req, res) => {

    const ids = req.body

    if (ids.length === 0) {


        return res.status(400).json('u didnot select any row')

    }


    Message.deleteMany({ _id: { $in: ids } })

        .then(() => {


            console.log('deleted selected messages')

            return res.json('selected item deleted')
        })
        .catch((error) => {

            console.log(error)
        })




}


export const blockuser = (req, res) => {

    const { userId, roomName, isBlocked } = req.body

    if (!roomName) {

        return res.status(400).json("Room not selected")

    }

    if (isBlocked === true) {


        Blockuser.findOne({ user: userId, roomname: roomName })

            .then((result) => {

                if (result) {

                    return res.status(400).json(`user already block ${result.roomname}`)

                }


                new Blockuser({ roomname: roomName, user: userId }).save()
                    .then(() => {

                        console.log('block user saved')

                        return res.json('user blocked successfully')
                    })
                    .catch((error) => {

                        console.log(error)
                    })


            })
            .catch((error) => {

                console.log(error)
            })


    }


    if (isBlocked === false) {



        Blockuser.findOneAndDelete({ user: userId, roomname: roomName })

            .then((result) => {

                if (result) {


                    console.log(result)

                    return res.json('user unblock successfully')



                } else {

                    console.log('No matching document found');
                }

            })

            .catch((error) => {

                console.log(error)
            })



    }



}


export const getblockuser = (req, res) => {

    const { search } = req.query

    User.find({ username: { $regex: new RegExp(search, 'i') } })
        .then((result) => {

            const finduser = result.map(user => user._id);

            const query = {

                $or: [

                    { username: { $regex: new RegExp(search, 'i') } },
                    { user: { $in: finduser } }


                ]

            }

            return Blockuser.find(query).populate({ path: 'user', select: '-password -retypepassword' })

        })
        .then(blockusers => {

            return res.json(blockusers);

        })
        .catch((error) => {

            console.log(error)

        })


}


export const deleteblockuser = (req, res) => {

    const { id } = req.query

    Blockuser.findByIdAndDelete(id)

        .then(() => {

            return res.json('user deleted successfully')
        })
        .catch((error) => {

            console.log(error)

        })



}

export const multipleblockuserdel = (req, res) => {

    const ids = req.body


    Blockuser.deleteMany({ _id: { $in: ids } })

        .then((result) => {

            return res.json('selected user deleted')
        })
        .catch((error) => {

            console.log(error)
        })

}