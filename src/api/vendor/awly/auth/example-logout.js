module.exports = function(req, res){
    return new Promise((resolve, reject) => {
        var jwt = require("jsonwebtoken");
        var token = jwt.sign({ firstName: null, lastName: null }, "secret");

        resolve({
            headers: {
                "Set-Cookie": clearCookie("auth_example", token)
            },
            body: {
                success: true,
                token: null
            }
        });
    });
};

var clearCookie = function(name, value) {
    var date = new Date(0);
    var expires = "; expires=" + date.toGMTString();
    return name + "=" + value + expires + "; path=/; HttpOnly; Secure";
};
