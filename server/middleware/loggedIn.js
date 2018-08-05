const loggedIn = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        throw new Error('Unauthorized');
    }
}

module.exports = loggedIn;