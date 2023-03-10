const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('books');
        },
        user: async (parent, { title }) => {
            return User.findOne({ title }).populate('books');
        },
        user: async (parent, { authors }) => {
            return User.findOne({ authors }).populate('books');
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ authors: lastName });
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({ _id: bookId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const token = signToken(user);
            return { token, user };
        },
        // addBook: async (parent, { bookId }, context) => {
        //     if (context.user) {
        //         const book = await Book
                
        //     }
        // }
        // removeBook: {
            
        // },
    },
};

module.exports = resolvers;