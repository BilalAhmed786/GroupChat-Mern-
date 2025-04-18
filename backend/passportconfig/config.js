import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/users.js';

passport.use(new LocalStrategy(

    { usernameField: 'email', passReqToCallback: true },

    async (req, username, password, done) => {

        try {
            const user = await User.findOne({ email: username });

            if (!user) {

                return done(null, false, { message: 'invalid email password' });
            }

             bcrypt.compare(password, user.password, (err, res) => {

                if (res) {


                    return done(null, user);
                }
                else {

                    return done(null, false, { message: 'invalid email password' });
                }

            })


        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {

    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        
        done(err);
    }
});

export default passport;