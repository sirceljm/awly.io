module.exports = function(req, res){
    return new Promise((resolve, reject) => {
        var jwt = require("jsonwebtoken");
        var token = jwt.sign({ firstName: req.body.firstName, lastName: req.body.lastName }, "secret");

        resolve({
            headers: {
                "Set-Cookie": createCookie("auth_example", token, 1)
            },
            body: {
                success: true,
                token: token
            }
        });

    });
};

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    return name + "=" + value + expires + "; path=/; HttpOnly; Secure";
};
