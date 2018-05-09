// requiring packages
var express		=	require('express'),
	router		=	express.Router(),
	User		=	require('../models/user'),
	middleware 	=	require('../middleware');


// render the home page
router.get('/home', middleware.isLoggedIn, function(req, res) {
	res.render('user/home');
});

// render the chatroom page
router.get('/chatroom', middleware.isLoggedIn, function(req, res) {
	res.render('user/chatroom');
});

// render the profile page
router.get('/:id', middleware.isLoggedIn, function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		if (err) {
			req.flash('error', 'Profile does not exist.');
			res.redirect('/user/home');
		} else {
			res.render('user/profile', {user: foundUser});
		}
	});
});

// render the edit profile page
router.get('/:id/edit', middleware.isLoggedIn, function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		if (err) {
			req.flash('error', 'You do not have privileges to do that.');
			res.redirect('/user/home');
		} else {
			res.render('user/edit', {user: foundUser});
		}
	});
});

// handle the logic for edit profile
router.put('/:id', middleware.isLoggedIn, function(req, res) {
	User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
		if(err) {
			console.log(err);
			req.flash('error', 'Something went wrong. Please try again.');
			res.redirect('/user/home');
		} else {
			req.flash('success', 'Successfully updated.');
			res.redirect('/user/' + updatedUser._id);
		}
	});
});

module.exports 	=	router;