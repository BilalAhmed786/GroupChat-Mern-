import Message from "../models/message.js";
import ChatRoom from "../models/chatroom.js"
import roomuser from "../models/roomusers.js"
import User from "../models/users.js";
import Blockuser from "../models/blockuser.js";
import trackuser from "../models/trackusers.js";
import s3 from "../s3/s3.js";
import { DeleteObjectCommand } from '@aws-sdk/client-s3';




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



            return res.json({ room: roomcreate, msg: 'room creates successfully' })

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

        const updatedroom = await ChatRoom.findOne({ _id: updateroom._id })

        if (updatedroom) {

            return res.json({
                updateroom: updatedroom,
                msg: "update successfully"
            })

        }


    } catch (error) {

        console.log(error)
    }


}


export const deleteroom = async (req, res) => {

    const { id } = req.params

    try {

        const chatroom = await ChatRoom.findByIdAndDelete(id)

        console.log("deleteRoom", chatroom)

        if (chatroom) {

            await Message.deleteMany({ room: id })

            return res.json(
                {
                    deleteroom: chatroom,
                    msg: 'delete successfully'
                })
        }


    } catch (error) {


        console.log(error)


    }


}

export const multiitemdel = async (req, res) => {
    const roomsid = req.body;

    if (!roomsid || roomsid.length === 0) {
        return res.status(400).json('You didn’t select any row');
    }

    try {
        // Step 1: Find rooms to be deleted
        const deletedRooms = await ChatRoom.find({ _id: { $in: roomsid } });

        if (deletedRooms.length === 0) {
            return res.status(404).json('No matching rooms found');
        }

        // Step 2: Delete rooms and related messages
        await Promise.all([
            ChatRoom.deleteMany({ _id: { $in: roomsid } }),
            Message.deleteMany({ room: { $in: roomsid } }),
        ]);

        // Step 3: Send back deleted room details
        res.json({
            msg: 'Selected rooms and their messages deleted successfully',
            deletedRooms: deletedRooms,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json('Something went wrong while deleting rooms or messages');
    }
};
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


export const deleteuser = async (req, res) => {
    try {
        const { id } = req.params;

        await Promise.all([
            User.findByIdAndDelete(id),
            roomuser.findOneAndDelete({ user: id }),
            trackuser.findOneAndDelete({ user: id }),
            Blockuser.findOneAndDelete({ user: id })
        ]);

        return res.status(200).json({ message: 'User and related data deleted successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


export const multideleteuser = async (req, res) => {
    const ids = req.body;

    if ( ids.length === 0) {
        return res.status(400).json('You did not select any row');
    }

    try {
        await Promise.all([
            User.deleteMany({ _id: { $in: ids } }),
            roomuser.deleteMany({ user: { $in: ids } }),
            trackuser.deleteMany({ user: { $in: ids } }),
            Blockuser.deleteMany({ user: { $in: ids } })
        ]);

        return res.status(200).json('User and related data deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting users', error });
    }
};


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


export const deletemessage = async (req, res) => {
    const { id } = req.params;
  
    try {
      const message = await Message.findById(id);
  
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      const content = message.message;
  
      // ✅ Check if it's an S3-hosted image via CloudFront
      if (content && content.includes(process.env.CLOUDFRONT_DOMAIN)) {
        // Extract the key from CloudFront URL
        const url = new URL(content);
        const key = decodeURIComponent(url.pathname.substring(1)); // removes leading "/"
  
        // Delete image from S3
        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
          };
          const deleteCommand = new DeleteObjectCommand(deleteParams);
         
          await s3.send(deleteCommand);
 
          console.log(`Deleted image from S3: ${key}`);
      }
  
      // Delete the message from MongoDB
     const messageroom = await Message.findByIdAndDelete(id);
  
      return res.status(200).json(
        {
            msg:'message delete successfully',
            messageroom

          }
    );
    } catch (error) {
      console.error('Delete error:', error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };


  export const multidelmessage = async (req, res) => {
    const ids = req.body;
  
    if (!ids || ids.length === 0) {
      return res.status(400).json('You did not select any messages');
    }
  
    try {
      // Step 1: Fetch messages
      const messages = await Message.find({ _id: { $in: ids } });
  
      // Step 2: Identify and delete any S3-stored images
      const imageDeletes = messages
        .filter((msg) => msg.message?.includes(process.env.CLOUDFRONT_DOMAIN))
        .map((msg) => {
          const url = new URL(msg.message);
          const key = decodeURIComponent(url.pathname.substring(1)); // remove "/"
          const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
          });
          return s3.send(command);
        });
  
      // Step 3: Wait for all deletions
      await Promise.all(imageDeletes);
  
      // Step 4: Delete messages from DB
      await Message.deleteMany({ _id: { $in: ids } });
  
      console.log('Deleted selected messages and images');
      return res.json(
        {
          msg:'Selected messages deleted successfully',
          messages
    
        });
    } catch (error) {
      console.error('Error during multi-delete:', error);
      return res.status(500).json({ error: 'Something went wrong during deletion' });
    }
  };


export const blockuser = async (req, res) => {
    const { userId, roomName, isBlocked } = req.body;

    if (!roomName) {
        return res.status(400).json("Room not selected");
    }

    try {
        if (isBlocked === true) {
            const existing = await Blockuser.findOne({ user: userId, roomname: roomName });

            if (existing) {
                return res.status(400).json(`User already blocked in room ${existing.roomname}`);
            }

            const newBlock = await new Blockuser({ roomname: roomName, user: userId }).save();
            const populatedBlock = await Blockuser.findById(newBlock._id).populate('user');

            // Optionally remove user from the room
            await roomuser.findOneAndDelete({ user: userId });

            return res.json(populatedBlock);
        }

        else if (isBlocked === false) {
            // Step 1: Find the block document with populated user
            const blockDoc = await Blockuser.findOne({ user: userId, roomname: roomName }).populate('user');

            if (blockDoc) {
                // Step 2: Delete the block document
                await Blockuser.findByIdAndDelete(blockDoc._id);



                return res.json(blockDoc);
            }
        }

        else {
            return res.status(400).json("Invalid isBlocked value");
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json("Something went wrong");
    }
};



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


export const deleteblockuser = async (req, res) => {
    try {
        const { id } = req.query;

        // Find the block entry and populate the user field
        const user = await Blockuser.findOne({ user: id }).populate('user');

        if (!user) {
            return res.status(404).json({ msg: 'Blocked user not found' });
        }

        // Delete the block entry
        await Blockuser.findOneAndDelete({ user: id });

        // Return the populated user
        return res.json({
            user,
            msg: 'User unblocked successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
};



export const multipleblockuserdel = async (req, res) => {
    try {
        const { ids } = req.body; // Assuming request body is { ids: [...] }
        // console.log("userids:",ids)
        // Find users before deleting
        const deleteusers = await Blockuser.find({ user: { $in: ids } }).populate('user');

        // Delete the users
        await Blockuser.deleteMany({ user: { $in: ids } });

        return res.json({
            users: deleteusers,
            msg: 'Selected users deleted',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
};
