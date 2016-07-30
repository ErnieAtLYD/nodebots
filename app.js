console.log ('NODEBOTS DAY PROJECT');

var express = require('express'),
	fs = require('fs'),
	_ = require('underscore'),
	filename = 'members.json',
	logfile = 'logs.csv',
	DEBUG = true,
	objMembers = JSON.parse(fs.readFileSync(filename, 'utf8'));

var app = express();


// arg: id, string of id inside json
// returns false if no member found
function getMember(id) {
	console.log('get', id);
	var filter = _.where(objMembers, {id: id});
	return _.isEmpty(filter) ? false : filter;
};


// Adds a line to the log file
// obj: person of the object after action that has been completed
// status: a string: 'toggled'
function logEvent(obj, status) {
	// var tmp = fs.createWriteStream(logfile);
	if (status) {
		switch (status) {
			case 'toggled':
				console.log(obj.name + ' has checked ' + (obj.checkedin) ? 'in' : 'out'); 
				break;
			default:
				console.log('Something has been logged!');
		}	
	}
};


// updates members variable automatically.
// arg: string of member id, e.g. ;000052?
// returns object of id and boolean if member has been toggled
// returns false if no member found
function toggleStatus(id) {
	console.log('toggleStatus', id)
	console.log (objMembers);
	var member = getMember(id);
	if (_.isEmpty(member)) {
		return false;
	} else {
		console.log('toggling ' + member[0].checkedin);
		member[0].checkedin = !member[0].checkedin;
		logEvent(member[0], 'toggled');
		return member[0];
	}
};

// Card reader is in ;000049? format
// https://www.npmjs.com/package/card-swipe
if (DEBUG) {
	// console.log(getMember('a'));
	// console.log(getMember('000052'));
	console.log(toggleStatus('000049'));	
}

// Express REST functions
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}


app.get('/members/:id', function (req, res) {
	var tmp, member = getMember(req.params.id);
	if (_.isEmpty(member)) {
		tmp = {
			property: 'error',
			message: 'User not found.'
		}
	} else {
		tmp = member[0];
		res.send(tmp);
	}
});


/*  "/members"
 *	Returns json of all members
 *  
 */
app.get('/members', function (req, res) {
	var params = req.query;
	if (_.isEmpty(params)) {
		res.json(objMembers);		
	} else {
		if (params.status) {
			switch (params.status) {
				case 'in':
					filter = _.filter(objMembers, {"checkedin": true});
					res.json(filter);
					break;
				case 'out':
					filter = _.filter(objMembers, {"checkedin": false});
					res.json(filter);
					break;
				default:
					res.json(objMembers);
			}
		}
	}
});


app.get('/member/:id', function (req, res) {
	var tmp, member = getMember(req.params.id);
	if (_.isEmpty(member)) {
		tmp = {
			property: 'error',
			message: 'User not found.'
		}
	} else {
		tmp = member[0];
		res.send(tmp);
	}
});


// returns { 'checkedin': true } or { 'checkedin' : false }
app.get('/member/:id/toggle', function (req, res) {
	// console.log ('entered toggle API', req.params.id);
	var ret = toggleStatus(req.params.id);
	res.send(ret);
});


app.get('/member/:id/activate', function (req, res) {
	var member = getMember(req.params.id);
	if (_.isEmpty(member)) {
		return false;
	} else {
		member[0].hasAccess = true;
		logEvent(member[0]);
		res.send(member[0]);
	}
});


app.get('/member/:id/deactivate', function (req, res) {
	var member = getMember(req.params.id);
	if (_.isEmpty(member)) {
		return false;
	} else {
		member[0].hasAccess = false;
		logEvent(member[0]);
		res.send(member[0]);
	}
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});