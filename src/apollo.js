import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
        typePolicies: {
            Movie: {
                keyFields: (obj) => `Movie:${obj.id}`
            }
        }
    }),
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            togglelikeMovie: (_, { id }, { cache }) => {
                cache.modify({
                    id: `Movie:${id}`,
                    fields: {
                        isLiked(prev) {
                            return !prev
                        }
                    }
                })
            }
        }
    }
});

export default client