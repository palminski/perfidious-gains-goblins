import { gql } from '@apollo/client';

export const QUERY_USER = gql`
   {
    user {
        username
        excersizes {
            excersize
            amount
            units
            reps
            sets
        }
    }
   }
`
export const QUERY_ME = gql`
   {
    me {
        _id
        username
        excersizes {
            excersize
            amount
            units
            reps
            sets
        }
        posts {
            postTitle
            postText
            createdBy
            comments {
                commentText
                createdBy
            }
        }
    }
   }
`