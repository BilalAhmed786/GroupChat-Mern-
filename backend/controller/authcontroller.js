import User from "../models/users.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const register = async (req, res) => {
   
    
    const validation = []

    const { username, email, password, retypepassword } = req.body


            
    if (!username || !email || !password || !retypepassword) {

        validation.push('All fields required')

    }


    if (password && password.length <= 5) {

        validation.push('minimum six charteacter password')
    }


    if (password !== retypepassword) {

        validation.push('password Mismatch')
    }

    const userfind = await User.findOne({ email })

    if (userfind) {


        validation.push('already registerd with this email')

    }

    if (validation.length > 0) {

        return res.status(400).json({valid:validation})
    }
    try {

        const hashpassword = await bcrypt.hash(password, 10)


        const usercreate = new User({ username, email, password: hashpassword, retypepassword: hashpassword })

        const usercreated = await usercreate.save();

        if (usercreated) {


            return res.json({ msg: 'user created successfully' })


        }


    } catch (error) {


        console.log(error)

    }



}




export const login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/api/auth/authorize',
        failureRedirect: '/api/auth/validate',
        failureFlash: true

    })(req, res, next)

}


export const validate = (req, res) => {

    const flashmessage = req.flash('error')[0]


    return res.status(400).json(flashmessage)

}

export const authuser = (req, res) => {

    if (req.user) {


        return res.json(req.user)
    } else {

        return res.json({ msg: 'invalid user' })
    }
}


export const logout = (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.json({ msg: "logout success" });

    });
}


export const forgetpass = async (req, res) => {

    const { email } = req.body

    if (!email) {

        return res.status(400).json({msg:'field is required'})
    }

    try {

        const userfind = await User.findOne({ email })
        

        if (!userfind) {

            return res.status(400).json({msg:'not registerd'})
        }


        const token = jwt.sign({

            userid: userfind._id

        }, process.env.TOKENSEC, { expiresIn: '3min' })






        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.FROM,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.FROM,
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetpassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                
                console.log(error);
            
            } else {
              

                return res.json({success:'email sent for reset password'})
            
            }
        });



    } catch (err) {

        console.log(err)
    }


}

export const resetpass = async (req, res) => {

    const { token, newPassword, confirmPassword } = req.body

        const validation = []
   
        if (!newPassword || !confirmPassword) {

        validation.push('all fields required')
    }


    if (newPassword !== confirmPassword) {

        validation.push('Mismatch passwords')

    }

    if(newPassword.length <= 5){

        
        validation.push('password atleast six character long')
   
    }


    if(validation.length > 0){


        return res.status(400).json(validation)
    
    }
    
           
      const decode =  jwt.verify(token,process.env.TOKENSEC, (err, decoded) => {
       
         if (err){
            
            console.log('invalid user')

            return res.json({valid:'sessoin expire try again'})
         
        };

            return decoded;

        
    });
    

    const hashpassword = await bcrypt.hash(newPassword, 10)

    try {



        const userupdate = await User.findByIdAndUpdate(decode.userid, { password: hashpassword, retypepassword: hashpassword })



        if (userupdate) {

            console.log('user updated')

            return res.json({success:'password chage successfully'})
        }


    } catch (error) {
       
        if (error) {
            validation.push('session expired')

            return res.status(400).json(validation)
        }
    }
}


