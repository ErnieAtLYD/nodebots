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


// arg: id
function toggleStatus() {

};

// Card reader is in ;000049? format
// https://www.npmjs.com/package/card-swipe
if (DEBUG) {
	console.log(getMember('a'));
	console.log(getMember(';000052?'));
}