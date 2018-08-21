var graphql = require("graphql");
var Schema = require("./schema");

function runGraphQL(query, cb) {
    // patch to allow queries from GraphiQL
    // like the initial introspectionQuery
    if (query && query.hasOwnProperty("query")) {
        query = query.query.replace("\n", " ", "g");
    }

    graphql
        .graphql(Schema, query)
        .then( function(result) {
            return cb(null, result);
        })
        .catch( function(error) {
            console.log(error);
            return {error: error};
        });
}

module.exports = runGraphQL;
