import gql from "graphql-tag";

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    authors
                    title
                    image
                    description
                    link
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    authors
                    title
                    image
                    description
                    link
                }
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: bookInput) {
        saveBook(book: $book) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                image
                description
                link
            }
        }
    }
`;



export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                image
                description
                link
            }
        }
    }
`;