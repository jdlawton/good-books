import gql from 'graphql-tag';

//exporting mutations on the front end so they can be imported and used in the React pages/components.
export const LOGIN_USER = gql`
   mutation login ($email: String!, $password: String!){
       login(email: $email, password: $password) {
           token
           user {
               _id
               username
           }
       }
   }
`;

export const ADD_USER = gql `
   mutation addUser($username: String!, $password: String!, $email: String!){
       addUser(username: $username, password: $password, email: $email) {
           token
           user {
               _id
               username
           }
       }
   }
`;

export const SAVE_BOOK = gql `
   mutation saveBook($authors: [String], $description: String!, $title: String!, $bookId: String!, $image: String, $link: String) {
       saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
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

export const REMOVE_BOOK = gql `
   mutation removeBook ($bookId: String!){
       removeBook(bookId: $bookId) {
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