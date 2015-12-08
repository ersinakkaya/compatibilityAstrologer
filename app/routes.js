var users = require('./controllers/users');

//v1 endpoints
module.exports = function (server) {
	//Index
	server.get('/api/test', users.test);
	server.get('/api/start', users.start);
	server.get('/api/getSession', users.getSession);
	server.post('/api/saveCollaborationType', users.saveCollaborationType);
	server.post('/api/saveBirthday', users.saveBirthday);
	server.post('/api/saveSkills', users.saveSkills);
	server.post('/api/saveInterests', users.saveInterests);
	server.post('/api/saveExperience', users.saveExperience);
	server.post('/api/saveEducation', users.saveEducation);
	server.post('/api/saveCommitment', users.saveCommitment);
	server.get('/api/calculateScore', users.calculateScore);

  	server.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}