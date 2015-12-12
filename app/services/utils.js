var https = require('https'); 
var querystring = require('querystring');
var moment = require('moment');
var async = require('async');

module.exports.calculateFinalScore = function(data, done){
	if(!data) return callback('no data found!');

	async.waterfall([
		function(callback){
		    getAstrologicalScore(data, function(err, astrologicalScore){
				if(err) return callback(err);
				callback(null, astrologicalScore);
			})
		},
		function(astrologicalScore, callback){
			getCollaborativeScore(data, function(err, collaborativeScore){
			    if(err) return callback(err);
		      	var result = {
		      		astrologicalResponse: astrologicalScore,
		      		astrologicalScore: parseInt(astrologicalScore.score),
		      		collaborativeScore: collaborativeScore
		      	}
		      	result.finalScore = (result.astrologicalScore + collaborativeScore) / 2
		        callback(null, result);
			});
		}
	], function (err, result) {
	    // result now equals 'done'
	    done(null, result);
	    return;
	});
}

getAstrologicalScore = function(data, callback){
	if(
		typeof(data.user.birthday) 		   == "undefined" ||
		typeof(data.user.sex) 			   == "undefined" ||
		typeof(data.collaborator.birthday) == "undefined" ||
		typeof(data.collaborator.sex) 	   == "undefined"
	){
		callback('undefined birthday or gender');
		return;
	}
	var request = {
		date1: moment(new Date(data.user.birthday)).format("YYYY-MM-DD"),
		gender1: (data.user.sex == "male")? "M" : "F",
		date2: moment(new Date(data.collaborator.birthday)).format("YYYY-MM-DD"),
		gender2: (data.collaborator.sex == "male")? "M" : "F",
		relationship: "B",
		method: "getCompatibilityScore"
	}
	//console.log(request);
	request = querystring.stringify(request);
	var postOptions = {
	  host: 'ws.moonit.com',
	  port: '443',
	  path: '/api/',
	  method: 'POST',
	  headers: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	      'Content-Length':  Buffer.byteLength(request)
	  },
	  timeout: 30000
	};
	//console.log(postOptions);
	// Set up the request
	var req = https.request(postOptions, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (resp) {
	   resp = JSON.parse(resp);
	  	if(resp.success){
	  		callback(null, resp.result);
	  		return;
	  	}
	  	else{
	  		callback("error happened on http call");
	  		return;
	  	}
	  });
	});

	req.setTimeout(30000, function(){
		console.log('Request took more than ' + (30000/1000) + ' and killed!');
		req.abort();
		req.end();
		callback();
		return;
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		callback();
		return;
	});
		// post the data
	req.write(request);
	req.end();
}

getCollaborativeScore = function(data, done){
    if(
        typeof(data.user.skills)             == "undefined" ||
        typeof(data.user.interests)          == "undefined" ||
        typeof(data.user.experience)         == "undefined" ||
        typeof(data.user.degree)             == "undefined" ||
        typeof(data.user.commitment)         == "undefined" ||
        typeof(data.collaborator.skills)     == "undefined" ||
        typeof(data.collaborator.interests)  == "undefined" ||
        typeof(data.collaborator.experience) == "undefined" ||
        typeof(data.collaborator.degree)     == "undefined" ||
        typeof(data.collaborator.commitment) == "undefined"
    ){
        callback('insufficent data on collaborativeScore!');
        return;
    }

    var score = 0;
    async.waterfall([
        function(callback) {
            var matching_skills = [];
            for(var skill in data.user.skills){
                if(data.collaborator.skills[skill] == "true"){
                    matching_skills.push(skill);
                }
            }
            /*
            If there is 1 match, we are going to give %5 percent,
            If there is 2 match, we are going to give %10 percent,
            If there is 3 match, we are going to give %15 percent,
            If there is 4+ match, we are going to give %20 percent
            */
            if(matching_skills.length > 3){
                score += 20;
            }
            else if(matching_skills.length  == 3){
                score += 15;
            }
            else if(matching_skills.length  == 2){
                score += 10;
            }
            else if(matching_skills.length  == 1){
                score += 5;
            }
            else{
                score += 0;
            }
            callback(null, score);
        },
        function(score, callback) {
            var matching_interests = [];
            for(var interest in data.user.interests){
                if(data.collaborator.interests[interest] == "true"){
                    matching_interests.push(interest);
                }
            }

            if(matching_interests.length > 3){
                score += 20;
            }
            else if(matching_interests.length  == 3){
                score += 15;
            }
            else if(matching_interests.length  == 2){
                score += 10;
            }
            else if(matching_interests.length  == 1){
                score += 5;
            }
            else{
                score += 0;
            }
            callback(null, score);
        },
        function(score, callback) {
            if(data.user.experience == data.collaborator.experience){
                score += 20;
            }
            callback(null, score);
        },
        function(score, callback) {
            if(data.user.degree == data.collaborator.degree){
                score += 20;
            }
            callback(null, score);
        },
        function(score, callback) {
            if(data.user.commitment == data.collaborator.commitment){
                score += 20;
            }
            callback(null, score);
        }
    ], function (err, score) {
        done(null, score);
    });
}