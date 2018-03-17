var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that');
	res.redirect('/login');
}

middlewareObj.usernameToUpperCase = function(req, res, next) {
	req.body.username = req.body.username.toUpperCase();
	next();
}

module.exports = middlewareObj;