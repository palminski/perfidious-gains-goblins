import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation loginUser($username: String!, $password: String!) {
        loginUser( username: $username, password: $password) {
            token
            user {
                _id
            }
        }    
    }

`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            token
            user {
                _id
            }
        }    
    }
`;

export const ADD_POST = gql`
    mutation addPost($postTitle: String!, $postText: String!) {
  addPost(postTitle: $postTitle, postText: $postText) {
    postText
    postTitle
    createdBy
  }
}
`
export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      _id
      postText
      postTitle
    }
  }
`;

export const ADD_COMMENT = gql`
mutation AddComment($postId: String!, $commentText: String!) {
  addComment(postId: $postId, commentText: $commentText) {
    createdBy
    postText
    postTitle
    comments {
      commentText
      createdBy
    }
  }
}
`;

export const DELETE_COMMENT = gql`
mutation deleteComment($postId: String!, $commentId: String!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    comments {
      _id
    }
  }
}
`

export const ADD_EXERCISE = gql`
mutation AddExercise($exercise: String!, $amount: Float!, $units: String!, $reps: Int!, $sets: Int!) {
    addExercise( exercise: $exercise, amount: $amount, units: $units, reps: $reps, sets: $sets) {
    username  
    exercises {
        _id
        exercise
        amount
        units
        reps
        sets
    }
    }
  }
`
export const EDIT_EXERCISE = gql`
mutation EditExercise($exerciseId: ID! $exercise: String!, $amount: Float!, $units: String!, $reps: Int!, $sets: Int!) {
    editExercise( exerciseId: $exerciseId, exercise: $exercise, amount: $amount, units: $units, reps: $reps, sets: $sets) {
    username  
    exercises {
        _id
        exercise
        amount
        units
        reps
        sets
    }
    }
  }
`
export const DELETE_EXERCISE = gql`
mutation DeleteExercise($exerciseId: ID!) {
    deleteExercise(exerciseId: $exerciseId) {
     username 
     exercises {
        _id
        exercise
        amount
        units
        reps
        sets
    }
    }
  }
`
export const ADD_NOTE = gql`
mutation AddNote($noteText: String!) {
    addNote(noteText: $noteText) {
    username  
    notes {
        _id
        noteText
    }
    }
  }
`
export const EDIT_NOTE = gql`
mutation EditNote($noteId: ID!, $noteText: String!) {
    editNote( noteId: $noteId, noteText: $noteText) {
    username  
    notes {
        _id
        noteText
    }
    }
  }
  `

export const DELETE_NOTE = gql`
mutation DeleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId) {
     username 
     notes {
        _id
        noteText
    }
    }
  }
`

