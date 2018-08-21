const { ApolloClient } = require("apollo-client");
const { LocalLink } = require("apollo-link-local");
const { InMemoryCache } = require("apollo-cache-inmemory");
const gql = require("graphql-tag");
const schema = require("src/services/vendor/awly/graphql/schema.js");

const serverClient = new ApolloClient({
    link: new LocalLink({ schema }),
    cache: new InMemoryCache()
});

module.exports = function(req, res){
    return new Promise((resolve, reject) => {
        const requestBody = req.body;
        serverClient.query({
            query: gql`${requestBody.query}`,
            variables: requestBody.variables,
            fetchPolicy: "no-cache",
        }).then(data => {
            resolve({
                headers: {},
                body: data
            });
        }).catch(err => {
            console.log("ERR", err);
        });
    });
};
