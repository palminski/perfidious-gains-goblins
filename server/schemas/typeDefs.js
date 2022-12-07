const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        excersizes: [Excersize]
        posts: [Post]
    }

    type Post {
        _id: ID
        postTitle: String
        postText: String
        createdBy: String
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentText: String
        createdBy: String
    }

    type Excersize {
        _id: ID
        excersize: String
        ammount: Float
        units: String
        reps: Int
        sets: Int

    }

    type Query {
        users: [User]
        posts: [Post]
    }

    type Mutation {
        addUser(username: String!, password: String!): User
        addPost(createdBy: String!, postTitle: String!, postText: String!): Post
        addComment(postId: ID!, createdBy: String!, commentText: String!): Post
        addExcersize(userId: ID!, excersize: String!, ammount: Float!, units: String!, reps: Int!, sets: Int!): User
        deleteUser(_id: ID!): User
    }
`;

module.exports = typeDefs;