
const verify = (req,jwt) => {
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = req.header(tokenHeaderKey);
        console.log(req.header);
        return token && jwt.verify(token, jwtSecretKey);
}

module.exports = verify;