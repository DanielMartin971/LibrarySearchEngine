const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, data) => {
            if(data.user) {
                const userData = await User.findOne({ _id: data.user._id })
                    .select('-__v -password');
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            // This if statement checks to see if the user had put in the wrong credentials
            if(!user) throw new AuthenticationError('You got the wrong credentials, figure it out');

            const correctPw = await user.isCorrectPassword(password);

            // This if statement checks to see if the user has a incorrect password
            if(!correctPw) throw new AuthenticationError('Sorry not sorry, wrong password');

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, data) => {
            if(data.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: data.user._id },
                    { $addToSet: { savedBooks: args.book } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You gotta be logged in!');
        },
        removeBook: async (parent, args, data) => {
            if(data.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: data.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You gotta be logged in!');
        }
    }
};

module.exports = resolvers;