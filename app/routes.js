module.exports = function(app) {

	// server routes ===========================================================
	app.get('/api/index', function(req, res) {
		var data = {
			test: true
		}
		res.send(data);
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};