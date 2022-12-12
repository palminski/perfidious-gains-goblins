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