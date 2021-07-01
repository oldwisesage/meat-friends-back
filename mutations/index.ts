import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';

// make a fake graphql highlighter
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
    type Mutation {
        addToCart(cutId: ID): CartItem
    }
    
    `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
