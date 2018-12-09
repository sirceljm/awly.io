module.exports = function(hljs) {
    var scss = hljs.getLanguage("scss");
    var less = hljs.getLanguage("less");
    var js = hljs.getLanguage("javascript");

    // SCSS
    var IDENT_RE = "[a-zA-Z-][a-zA-Z0-9_-]*";
    var VARIABLE = {
        className: "variable",
        begin: "(\\$" + IDENT_RE + ")\\b"
    };
    var ATTRIBUTE_VALUE = {
        className: "variable",
        begin: /["']/, end: /["']/
    };
    var HEXCOLOR = {
        className: "number", begin: "#[0-9A-Fa-f]+"
    };
    // var DEF_INTERNALS = {
    //     className: "attribute",
    //     begin: "[A-Z\\_\\.\\-]+", end: ":",
    //     excludeEnd: true,
    //     illegal: "[^\\s]",
    //     starts: {
    //         endsWithParent: true, excludeEnd: true,
    //         contains: [
    //             HEXCOLOR,
    //             hljs.CSS_NUMBER_MODE,
    //             hljs.QUOTE_STRING_MODE,
    //             hljs.APOS_STRING_MODE,
    //             hljs.C_BLOCK_COMMENT_MODE,
    //             {
    //                 className: "meta", begin: "!important"
    //             }
    //         ]
    //     }
    // };

    // TEMPLATE
    var XML_IDENT_RE = "[A-Za-z0-9\\._:-]+";
    var TAG_INTERNALS = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [
            {
                className: "selector-id", begin: "\\#[A-Za-z0-9_-]+",
                relevance: 0
            },
            {
                className: "selector-class", begin: "\\.[A-Za-z0-9_-]+",
                relevance: 0
            },
            {
                className: "selector-attr", begin: "\\[", end: "\\]",
                illegal: "$"
            },
            {
                className: "attr",
                begin: XML_IDENT_RE,
                relevance: 0
            },
            {
                begin: /=\s*/,
                relevance: 0,
                contains: [
                    {
                        className: "string",
                        endsParent: true,
                        variants: [
                            {begin: /"/, end: /"/},
                            {begin: /'/, end: /'/},
                            {begin: /[^\s"'=<>`]+/}
                        ]
                    }
                ]
            }
        ]
    };
    return {
        case_insensitive: true,
        contains: [
            hljs.COMMENT(
                "<!--",
                "-->",
                {
                    relevance: 10
                }
            ),
            {
                className: "tag",
                begin: "</?", end: "/?>",
                contains: [
                    {
                        className: "name",
                        begin: /include\(/, end: /\)/,
                        contains: [ATTRIBUTE_VALUE],
                        relevance: 0
                    },
                    {
                        className: "name", begin: /[^/><\s.#@]/, relevance: 0
                    },
                    {
                        className: "selector-id", begin: "\\@[A-Za-z0-9_-]+",
                        relevance: 0
                    },
                    TAG_INTERNALS
                ]
            },
            {
                className: "selector-id",
                begin: /\$\{/,
                end: /\}/,
                contains: [TAG_INTERNALS]
            },
            {
                // className: "subst",
                begin: /style\.scss\s*\{/, end: /\}/,
                keywords: "style scss",
                contains: [
                    {begin: /\{/, end: /\}/, relevance: 0, contains: scss.contains.concat("self")}
                ].concat(scss.contains)
            },
            hljs.inherit(hljs.getLanguage("css"), {
                begin: /style\s*\{/, end: /\}/,
                keywords: "style",
            }),
            {
                begin: /style\.less\s*\{/, end: /\}/,
                keywords: "style less",
                contains: [
                    {begin: /\{/, end: /\}/, relevance: 0, contains: less.contains.concat("self")}
                ].concat(less.contains)
            },
            {
                begin: /class\s*\{/, end: /\}/,
                keywords: "class",
                contains: [
                    {
                        begin: /[A-Za-z$_][0-9A-Za-z$_]*\(\)/,
                        keywords: "onCreate onMount",
                        end: /\}/,
                        relevance: 0,
                        contains: [{
                            begin: /\{/, end: /\}/,
                            relevance: 0,
                            contains: js.contains.concat("self")
                        }]
                    }
                ]

                // contains:[createBlock({
                //     begin: /[A-Za-z$_][0-9A-Za-z$_]*\(\)\s*\{/, end: /\}/,
                //     beginClassName: "meta",
                //     endClassName: "meta",
                //     // endsParent: true,
                //     returnEnd: true,
                //     contains: hljs.getLanguage("javascript").contains,
                // }, true)]
            },
            {
                begin: /\b(static|server-static|server)\s*\{/, end: /\}/,
                keywords: "static server-static server",
                contains: hljs.getLanguage("js").contains
            }
        ]
    };
};
