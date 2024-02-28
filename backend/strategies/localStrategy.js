import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/userModel.js";


const customFields = {
    usernameField: 'email'
};

const verifyCallBack = async (email, password, done) => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            return done(null, false, { message: 'User not found!' })
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Invalid Password' });
        }
        return done(null, user);
    } catch (error) {
        done(error);
    }
};

const strategy = new Strategy(customFields, verifyCallBack);
export default passport.use(strategy);

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
