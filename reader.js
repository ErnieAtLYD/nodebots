let http = require('http');
let readline = require('readline');
let SERVER = 'http://10.1.10.243:3000';

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', function(id) {
	console.log('Swiped ID: ', id = id.slice(1, -1));
	http.get(`${SERVER}/member/${id}/toggle`, function(req) {
		let body = '';
		req.on('data', function(data) {
			body += data;
		});

		req.on('end', function() {
			let member = JSON.parse(body);
			if(member.hasAccess) {
				console.log(`${member.name} your status has been successfully changed to ${member.checkedin ? 'IN' : 'OUT'}`);
			} else {
				console.log(`Sorry ${member.name} you do not have access to moonlighter makerspace :(`);
			}
		});
	});
});

let port = process.env.PORT || 4000;
console.log(`Readline Running on port ${port}`);
console.log(`You may now swipe your card`);