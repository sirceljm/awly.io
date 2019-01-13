let AWS = require("aws-sdk");
// const https = require("https");

require("dotenv").config();

let dynamoConfig = {
    endpoint:        process.env.DYNAMODB_ENDPOINT,
    // accessKeyId:     process.env.AWS_ACCESS_KEY_ID, // only required for local DynamoDB
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // only required for local DynamoDB
    region:          process.env.AWS_REGION,
    // httpOptions: {
    //     agent: new https.Agent({
    //         rejectUnauthorized: true,
    //         keepAlive: true,
    //         secureProtocol: "TLSv1_method",
    //         ciphers: "ALL"
    //     })
    // }
};

const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const schema = {
    AttributeDefinitions: [{
        AttributeName: "profileId",
        AttributeType: "S"
    }],
    KeySchema: [{
        AttributeName: "profileId",
        KeyType: "HASH"
    }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: "profiles"
};

module.exports = {
    handlers: {
        getProfiles: getProfiles
    }
};

function getProfiles(limit, cursor) {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: schema.TableName,
            AttributesToGet: [
                "profileId",
                "firstName",
                "lastName",
                "country",
                "city",
                "avatarImgUrl"
            ],
        };

        if(limit){
            params.Limit = limit;
        }

        if(cursor){
            params.ExclusiveStartKey = {
                "profileId": cursor
            };
        }

        docClient.scan(params, (err, data) => {
            if (err){
                reject(err);
            }else{
                resolve({
                    lastCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.profileId : null,
                    items: data["Items"]
                });
            }
        });
    });
}
