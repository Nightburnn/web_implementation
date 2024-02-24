import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/userModel.js";

export default passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        }
        if (!user.validPassword(password)) {
            res.status(400).send('Invalid Password');
            throw new Error('Invalid Password');
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

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
