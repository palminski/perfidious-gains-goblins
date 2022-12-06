const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String
        excersizes: [Excersizes]
    }

    type Excersizes {
        excersize: String
        ammount: Float
        units: String
        reps: Int
        sets: Int

    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String!, password: String!): User
        addExcersize(userId: ID!, excersize: String!, ammount: Float!, units: String!, reps: Int!, sets: Int!): User
        deleteUser(_id: ID!): User
    }
`;

module.exports = typeDefs;