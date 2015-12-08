var usersModel = require('../models/users');

module.exports.test = function (req, res) {
	var data = { 
		title: 'Collaborative Compatibility Tool', 
		message: 'Hello there!'
	};
	res.status(200).send(data);
};

module.exports.start = function (req, res) {
	data = {
		registered: true
	};
	usersModel.register(data, function(err, resp){
		if(err){
			throw err;
		}
		else{
			data.session_key = resp._id;
			delete data._id;
			res.status(200).send(data);
			return;
		}
	});
};

module.exports.getSession = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false});
				return;
			}
			else{
				res.status(200).send(data);
				return;
			}
		});
	}
};

module.exports.saveCollaborationType = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				data.type = req.body.type;
				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true});
					}
				});
			}
		});
	}
};

module.exports.saveBirthday = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				data.user = {
					birthday: req.body.user_birthday,
					sex: req.body.user_sex
				}
				data.collaborator = {
					birthday: req.body.collaborator_birthday,
					sex: req.body.collaborator_sex
				}
				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true});
					}
				});
			}
		});
	}
};

module.exports.saveSkills = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				data.user.skills = req.body.user_skills;
				data.collaborator.skills = req.body.collaborator_skills;
				
				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true});
					}
				});
			}
		});
	}
};

module.exports.saveInterests = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				data.user.interests = req.body.user_interests;
				data.collaborator.interests = req.body.collaborator_interests;

				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true});
					}
				});
			}
		});
	}
};

module.exports.saveExperience = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				data.user.experience = req.body.user_experience;
				data.collaborator.experience = req.body.collaborator_experience;

				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true});
					}
				});
			}
		});
	}
};

module.exports.saveEducation = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				data.user.degree = req.body.user_degree;
				data.collaborator.degree = req.body.collaborator_degree;
				
				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true});
					}
				});
			}
		});
	}
};

module.exports.saveCommitment = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				data.user.commitment = req.body.user_commitment;
				data.collaborator.commitment = req.body.collaborator_commitment;
				
				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true});
					}
				});
			}
		});
	}
};

module.exports.calculateScore = function (req, res) {
	if(typeof(req.query.session_key) == 'undefined' || req.query.session_key.length == 0){
		res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
		return;
	}
	else{
		usersModel.getById(req.query.session_key, function(err, data){
			if(err){
				body = {
					success: false,
					message: "Error on fetching the data: " + err
				};
				res.status(200).send(body);
				return;
			}

			if(typeof(data) == 'undefined'){
				res.status(200).send({success: false, error: true, message: 'session_key is not defined!'});
				return;	
			}
			else{
				//Here we calculate results
				data.score = Math.floor((Math.random() * 51)) + 50;
				usersModel.update(req.query.session_key, data, function(err, resp){
					if(err){
						throw err;
					}
					else{
						res.status(200).send({success: true, score: data.score});
					}
				});
			}
		});
	}
};