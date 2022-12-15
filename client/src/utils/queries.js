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
            _id
            excersize
            amount
            units
            reps
            sets
        }

        notes {
            _id
            noteText
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

export const QUERY_POSTS = gql`
     {
        posts {
            _id
            postTitle
            postText
            createdBy
            comments {
                commentText
                createdBy
            }
        }
     }
`
        