const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        exercises: [Exercise]
        notes: [Note]
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
    type Exercise {
        _id: ID
        exercise: String
        amount: Float
        units: String
        reps: Int
        sets: Int
    }

    type Note {
        _id: ID
        noteText: String
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
        deletePost(postId: String!): Post
        addComment(postId: String!, commentText: String!): Post
        deleteComment(postId: String!, commentId: String!): Post

        addExercise(exercise: String!, amount: Float!, units: String!, reps: Int, sets: Int): User
        editExercise(exerciseId: ID!, exercise: String!, amount: Float!, units: String!, reps: Int!, sets: Int!): User
        deleteExercise(exerciseId: ID!): User

        addNote(noteText: String!): User
        editNote(noteId: ID!,noteText: String!): User
        deleteNote(noteId: ID!): User

        deleteUser(_id: ID!): User
        loginUser(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
    
