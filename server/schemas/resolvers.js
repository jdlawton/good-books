const {User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user){
                //console.log(context.user._id);
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password');
                //console.log(userData);
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    
    Mutation: {
        addUser: async (parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: {authors: args.authors, description: args.description, title: args.title, bookId: args.bookId, image: args.image, link: args.link}}},
                    {new: true}
                );
                console.log(updatedUser);
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },

        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: args.bookId}}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },
    },

};

module.exports = resolvers;