import roomuser from '../models/roomusers.js';
import trackuser from '../models/trackusers.js';



export const saveuser = async (chatroomid, userid, id) => {

  
    try {
      // Track user messages
      const trkuser = await trackuser.findOne({ user: userid });
  
      if (!trkuser) {
        const trakuser = new trackuser({ user: userid, room: chatroomid });
        await trakuser.save();
      }
  
     
      const user = new roomuser({ room: chatroomid, user: userid });
      const joinuser = await user.save();
  
      const userjoin = await roomuser
        .findOne({ _id: joinuser._id })
        .populate('room');
  
      return userjoin;
    } catch (error) {
      console.log(error);
    }
  };
  

export const finduser = async (chatroomid) => {


    try {
        const findusers = await roomuser.find({ room: chatroomid }).sort({ createdAt: -1 }).populate('user').populate('room')


        return findusers
    } catch (error) {

        console.log(error)

    }


}


export const collectuser = (findusers) => {


    return findusers.map(users => {

        return users.user.username

    })
}


export const removeuser = async (id) => {
  
  try {
    const disconnectedUser = await roomuser
      .findOneAndDelete({user: id })
      .populate('user')
      .populate('room');

    if (!disconnectedUser) {
      console.log("No user found with that socket ID");
      return null;
    }

    return disconnectedUser;

  } catch (error) {
    console.log("Error removing user:", error);
  }
};


export const getcurrentuser = async (id) => {
    
    try {

        const getcurrentuser = await roomuser.findOne({ user: id }).populate('user')

        return getcurrentuser


    } catch (error) {

        console.log(error)
    }

}

export const getjoinUser =async(userid)=>{



    const roomuser = await roomuser.findOne({_id,userid}).populate('room')



}