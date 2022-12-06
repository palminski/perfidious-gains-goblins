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
        },
        //This will be updated with login context in the future.
        addExcersize: async(parent, {userId, excersize, ammount, units, reps, sets}) => {
            const updatedUser = await User.findOneAndUpdate(
                {_id: userId},
                {$push: {excersizes: {excersize: excersize, ammount:ammount, units:units, reps:reps, sets:sets}}},
                {new:true, runValidators:true}
            );
            return updatedUser;
        },
    }
};

module.exports = resolvers