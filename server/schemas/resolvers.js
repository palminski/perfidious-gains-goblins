const {User} = require('../models');

const resolvers = {
    Query: {
        users: async() => {
            return User.find()
        },
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            return user;
        },
        deleteUser: async(parent, {_id}) => {
            const user = await User.deleteOne({_id: _id});
            return user;
        }
    }
};

module.exports = resolvers