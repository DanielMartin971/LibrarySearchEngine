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
                    image
                    title
                    image
                    description
                    link
                }
            }
        }
    }
`