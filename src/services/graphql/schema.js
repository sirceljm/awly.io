const Profiles_DbModel = require("./dynamodb/handlers/profiles");

const typeDefs = `
    type ProfileResults {
        lastCursor: String
        items: [Profile]
    }

    type Profile {
        profileId: String!
        firstName: String
        lastName: String
        city: String
        country: String
        avatarImgUrl: String
    }

    type ExampleLoginResponse {
        success: Boolean
        token: String
    }

    type Query {
        profiles(cursor: String, limit: Int): ProfileResults
        exampleLogin: ExampleLoginResponse
    }
`;

const resolvers = {
    Query: {
        profiles(obj, args, context, info){
            return Profiles_DbModel.handlers.getProfiles(args.limit, args.cursor);
        }
    }
};

let makeExecutableSchema = require("graphql-tools").makeExecutableSchema;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
