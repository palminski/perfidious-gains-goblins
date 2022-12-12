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
    mutation addPost($postTitle: String!, $postText: String!, $createdBy: String!) {
        addPost(postTitle: $postTitle, postText: $postText, createdBy: $createdBy) {
            token
            post {
                _id
            }
        }    
    }
`;


