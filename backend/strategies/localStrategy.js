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
            return done(null, false, { message: 'Incorrect email'})
        }
        const isPasswordvalid = await user.validPassword(password);

        if (!isPasswordvalid) {
            return done(null, false, { message: 'Invalid Password' });
        }
        return done(null, user);
    } catch (error) {
        return done(null, false, {message: 'Login failed'});
    }
};

const strategy = new Strategy(customFields, verifyCallBack);
passport.use(strategy);

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