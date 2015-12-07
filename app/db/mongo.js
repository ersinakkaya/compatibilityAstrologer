// config files
var mongodb = require('mongodb');
var config = {
    mongo: { url: 'ds057244.mongolab.com', db: "compatibility_astrologer", port: "57244", username: "admin", password: "8keuaVpn2CgYdZ3" },
    name: "live"
};

module.exports.init = function (callback) {
  var server = new mongodb.Server(config.mongo.url, config.mongo.port, {});
  new mongodb.Db(config.mongo.db, server, {w: 1}).open(function (error, client) {

    module.exports.client = client;
    if (config.mongo.username) {
    	client.authenticate(config.mongo.username, config.mongo.password, function(err, res) {
        if (err) { console.log("mongo init failed: ", err); }
    		callback(error)
    	});
    }
    else {
    		callback(error)
    }
  });
};