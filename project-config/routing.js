module.exports = {
    "/": {
        "type": "lambda",
        "localEndpoint": "src/pages/home"
    },
    "/api/auth/example-login": {
        "type": "lambda",
        "localEndpoint": "src/api/vendor/awly/auth/example-login.js"
    },
    "/api/auth/example-logout": {
        "type": "lambda",
        "localEndpoint": "src/api/vendor/awly/auth/example-logout.js"
    },
    "/contact": {
        "type": "lambda",
        "localEndpoint": "src/pages/contact"
    },
    "/docs": {
        "type": "lambda",
        "localEndpoint": "src/pages/docs"
    },
    "/examples": {
        "type": "lambda",
        "localEndpoint": "src/pages/examples"
    },
    "/examples/markojs": {
        "type": "lambda",
        "localEndpoint": "src/pages/examples_markojs"
    },
    "/features": {
        "type": "lambda",
        "localEndpoint": "src/pages/features"
    },
    "/getting-started": {
        "type": "lambda",
        "localEndpoint": "src/pages/getting-started"
    },
    "/privacy-policy": {
        "type": "lambda",
        "localEndpoint": "src/pages/privacy-policy"
    },
    "/terms": {
        "type": "lambda",
        "localEndpoint": "src/pages/terms"
    },
    "/cookie-policy": {
        "type": "lambda",
        "localEndpoint": "src/pages/cookie-policy"
    },
    "/gql": {
        "type": "lambda",
        "localEndpoint": "src/api/vendor/awly/gql/index.js"
    },
    "/logo": {
        "type": "lambda",
        "localEndpoint": "src/pages/logo"
    }
};
