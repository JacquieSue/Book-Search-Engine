const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [bookSchema]!
    }    

    type Book {
        _id: ID
        authors: [Authors]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        savedBooks(username: String): [savedBooks]
        book(bookId: ID!): Book
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(bookId: String!): User
        removeBook(bookID: ID!): User
    }
`;

module.exports = typeDefs;