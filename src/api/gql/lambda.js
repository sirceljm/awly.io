const { ApolloClient } = require("apollo-client");
const { LocalLink } = require("apollo-link-local");
const { InMemoryCache } = require("apollo-cache-inmemory");
const gql = require("graphql-tag");
const schema = require("src/services/graphql/schema.js");

const serverClient = new ApolloClient({
    link: new LocalLink({ schema }),
    cache: new InMemoryCache()
});

module.exports = function(req, res){
    return new Promise((resolve, reject) => {
        serverClient.query({
            query: gql`${req.query}`,
            variables: req.variables,
            fetchPolicy: "no-cache",
        }).then(data => {
            resolve(data);
        }).catch(err => {
            console.log("ERR", err);
        });
    });
};

      promiseFn = module.exports;
    