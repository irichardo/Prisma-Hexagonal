import gpl from 'graphql-tag'

export const userDefs = gpl`#graphql
type User{
    id: ID!,
    name:String!,
    email:String!,
    password:String!,
    role:String!
}
Type Query{
    allUsers:[User]!
}
`
