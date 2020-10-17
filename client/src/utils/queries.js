import gql from 'graphql-tag';

//export the query to get the user information so it can be imported and used in SavedBooks.js
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;