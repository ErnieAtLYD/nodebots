console.log ('NODEBOTS DAY PROJECT');
// TO DO:
// [ ] Write to a log file
// [ ] Add a checked in status to members to toggle

var fs = require('fs'),
	_ = require('underscore'),
	filename = 'members.json',
	DEBUG = true,
	objMembers = JSON.parse(fs.readFileSync(filename, 'utf8'));


// arg: id, string of id inside json
// returns false if no member found
function getMember(id) {
	console.log('get', id);
	var filter = _.where(objMembers, {id: id});
	return _.isEmpty(filter) ? false : filter;
};


// updates members variable automatically.
// arg: string of member id, e.g. ;000052?
// returns false if no member found
function toggleStatus(id) {
	console.log('toggle', id)
	console.log (objMembers);
	var member = getMember(id);
	if (_.isEmpty(member)) {
		return false;
	} else {
		console.log('toggling ' + member[0].checkedin);
		member[0].checkedin = !member[0].checkedin;
	}
};

// Card reader is in ;000049? format
// https://www.npmjs.com/package/card-swipe
if (DEBUG) {
	console.log(getMember('a'));
	console.log(getMember(';000052?'));
	console.log(toggleStatus(';000049?'));	
}