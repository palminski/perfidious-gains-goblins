const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String!, password: String!): User
        deleteUser(_id: ID!): User
    }
`;

module.exports = typeDefs;