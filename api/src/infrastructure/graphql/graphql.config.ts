import router from 'express'
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import { createHandler } from 'graphql-http'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      }
    }
  })
})

const app = router()

app.all('/graphql', createHandler({ schema }))
app.listen(4000)
console.log('listening on port 4000')
