
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const authheader = req.get("Authorization")
    if (!authheader) {
        req.isAuth = false
        return next()
    }

    const token = authheader.split(" ")[1];
    if (!token) {
        req.isAuth = false
        return next()
    }

    try {
        const verifyToken = jwt.verify(token, "secretKey")
        if (verifyToken) {
            const decodedToken = jwt.decode(token, "secretKey")
            const keys = Object.keys(decodedToken)
            if (keys.length) {
                req.isAuth = true
                req.userId = decodedToken.userId;
                req.email = decodedToken.email;
                return next()
            }
            else {
                req.isAuth = false
                return next()

            }
        }
    } catch (error) {
        console.log(error)
        req.isAuth = false
        return next()
    }


}