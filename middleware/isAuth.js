const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]

    if (token) {
        req.usersData = jwt.verify(token, 'spacemarmun')
        next()
    } else {
        throw new Error('Not allowed YOYO') 
    }
}