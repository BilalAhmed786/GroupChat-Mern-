import roomuser from '../models/roomusers.js';
import trackuser from '../models/trackusers.js';



export const saveuser = async (chatroomid, userid, id) => {


    try {

        // for track messages
        const trkuser = await trackuser.findOne({ user: userid })

        if (!trkuser) {

            const trakuser = trackuser({ user: userid, room: chatroomid })

            await trakuser.save()

        }

        const finduser = await roomuser.findOne({ user: userid })

        if (finduser) {


            const updateroomuser = await roomuser.findByIdAndUpdate(
                userid,
                { socketid: id })


            return updateroomuser

        }

        const user = roomuser({ room: chatroomid, user: userid, socketid: id })

        await user.save()

        if (user) {

            return user

        }

    } catch (error) {


        console.log(error)
    }


}

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
        const disconetuser = await roomuser.findOneAndDelete({ socketid: id }).populate('user').populate('room')

        return disconetuser

    } catch (error) {


        console.log(error)
    }

}

export const getcurrentuser = async (id) => {

    try {

        const getcurrentuser = await roomuser.findOne({ socketid: id }).populate('user')

        return getcurrentuser


    } catch (error) {

        console.log(error)
    }

}