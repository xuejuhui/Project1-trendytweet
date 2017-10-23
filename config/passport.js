var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../app/models/user.js');

module.exports = function(passport) {



    // I think it's session, grab from lecture  
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // TwitterStrategy
    passport.use(new TwitterStrategy({

            consumerKey: 'OUjwUJqiRoqpG0gTlZcgA1mv2',
            consumerSecret: 'prILcGZOQL9bRBrnk41tD1IdE4ZTNkGuYTfvtngvRtXk9rua1H',
            callbackURL: 'http://localhost:3000/auth/twitter/callback'

        },
        // save the return data from twitter to our database
        function(token, tokenSecret, profile, done) {
            // Got this from online User.findOne wont start until we get the data
            process.nextTick(function() {

                // look for user in our database
                User.findOne({
                    'twitter.id': profile.id
                }, function(err, user) {

                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        // new user if not in the database 
                        var newUser = new User();
                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        newUser.twitter.tokenSecret = tokenSecret;



                        // save new user into the database
                        newUser.save(function(err) {
                            if (err)
                                return err;
                            return done(null, newUser);
                        });
                    }
                });

            });

            console.log(token);
            console.log(tokenSecret);
        }));

    // local signup from lecture, most of these codes are from lecture
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            //look for user email in our database
            User.findOne({
                'local.email': email
            }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email used'));
                } else {
                    // create new user if not in the database
                    var newUser = new User();
                    // I cant get encrypt from lecture to work therefore I looked online and found new way of getting hash
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password); // use the generateHash function

                    // save user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });

        }));

    // local login from lecture
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            //look for user email in our database
            User.findOne({
                'local.email': email
            }, function(err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                return done(null, user);
            });

        }));

};