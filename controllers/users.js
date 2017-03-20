const express = require('express');
const router = express.Router();
const redis = require('redis');

// Setup redis
let client = redis.createClient();

// Search route so we can search for users.
router.post('/search', function ( req, res ) {
    let id = req.body.id;

    client.hgetall(id, function ( err, obj ) {
       if (!obj) {
           res.render('searchusers', {
               error: 'User does not exist'
           });
       } else {
           obj.id = id; // Assign an ID prop. to be id
           res.render('details', {
               user: obj // Pass the user object to the template
           });
       }
    });
});

// Add user route to display the add view.
router.get('/add', function ( req, res ) {
	res.render('adduser');
});

// Add user to our Redis database
router.post('/add', function ( req, res ) {
	let id = req.body.id;
	let first_name = req.body.first_name;
	let last_name = req.body.last_name;
	let email = req.body.email;
	let phone = req.body.phone;

	// Add the user to our database.
	client.hmset(id, [
		'first_name', first_name,
		'last_name', last_name,
		'email', email,
		'phone_number', phone
	], function ( err, reply ) {
		if (err) {
			console.log(err);
		}

		console.log(reply);
		res.render('searchusers', {
			error: 'User has been created'
		});
	});
});

// Delete user from our Redis database
router.delete('/delete/:id', function ( req, res ) {
	client.del(req.params.id); // Removes user from database
	res.render('searchusers', {
		error: 'User has been removed'
	});
});



module.exports = router;