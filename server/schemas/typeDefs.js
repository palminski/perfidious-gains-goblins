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
        amount: Float
        units: String
        reps: Int
        sets: Int
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        users: [User]
        posts: [Post]
        me: User
    }
    
    type Mutation {
        addUser(username: String!, password: String!): Auth
        addPost(postTitle: String!, postText: String!): Post
        addComment(postId: ID!, createdBy: String!, commentText: String!): Post

        addExcersize(excersize: String!, amount: Float!, units: String!, reps: Int, sets: Int): User
        editExcersize(excersizeId: ID!, excersize: String!, amount: Float!, units: String!, reps: Int!, sets: Int!): User
        deleteExcersize(excersizeId: ID!): User

        deleteUser(_id: ID!): User
        loginUser(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
    
