var mongo = require('../db/mongo');
var ObjectId = require('mongodb').ObjectID;

module.exports.test = function (callback) {
	callback(null, "here");
};

module.exports.getById = function (_id, callback) {
	mongo.client.collection("users").findOne({"_id": ObjectId(_id)}, function (err, data) {
		if (err) {
			 callback(err);
			 return;
		}
		else { 
			return callback(null, data);
		}
	});
};

module.exports.update = function (_id, data, callback) {
	mongo.client.collection("users").update({"_id": ObjectId(_id)}, data, { upsert: false }, function (err, data) {
		if (err) {
			 callback(err);
			 return;
		}
		else {
			return callback(null, data);
		}
	});
};

module.exports.register = function (user, callback){
	mongo.client.collection("users").insert(user, function (err, inserted) {
		if (err) return callback(err);
		callback(null, inserted[0]);
		return;
	});
}

module.exports.getBannedUdid = function (udid, callback){
	mongo.client.collection("banned_udids").findOne({"udid": udid }, function (err, data) {
		if (err) {
			 callback(err);
			 return;
		}
		else {
			return callback(null, data);
		}
	});
}

module.exports.getBannedEmail = function (email, callback){
	mongo.client.collection("banned_emails").findOne({"email": email }, function (err, data) {
		if (err) {
			 callback(err);
			 return;
		}
		else {
			return callback(null, data);
		}
	});
}