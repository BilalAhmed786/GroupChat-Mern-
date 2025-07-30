import { finduser,collectuser,removeuser } from "../utils/user.js";
export const handleUserLeave = async (userid,io) => {

  const disconetuser = await removeuser(userid);

  if (disconetuser) {
    io.to(disconetuser.room._id.toString()).emit(
      'message',
      `${disconetuser.user.username} has left the chat`
    );

    const findusers = await finduser(disconetuser.room._id);
  

    if (findusers.length > 0) {
      const chatuser = collectuser(findusers);

      io.to(disconetuser.room._id.toString()).emit('roomUsers', {
        room: findusers[0].room.name,
        users: chatuser,
      });
    }
  }
};
