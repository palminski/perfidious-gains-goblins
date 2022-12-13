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
    mutation AddPost($postTitle: String!, $postText: String!) {
  addPost(postTitle: $postTitle, postText: $postText) {
    postText
    postTitle
    createdBy
  }
}
`

export const ADD_EXCERSIZE = gql`
mutation AddExcersize($excersize: String!, $amount: Float!, $units: String!, $reps: Int!, $sets: Int!) {
    addExcersize( excersize: $excersize, amount: $amount, units: $units, reps: $reps, sets: $sets) {
    username  
    excersizes {
        _id
        excersize
        amount
        units
        reps
        sets
    }
    }
  }
`
export const DELETE_EXCERSIZE = gql`
mutation DeleteExcersize($excersizeId: ID!) {
    deleteExcersize(excersizeId: $excersizeId) {
     username 
     excersizes {
        _id
        excersize
        amount
        units
        reps
        sets
    }
    }
  }
`

