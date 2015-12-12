var _ = require("underscore");
var async = require("async");
var data ={
    "_id": {
        "$oid": "566c68a29fef91b0146c832d"
    },
    "registered": true,
    "type": "Business",
    "user": {
        "birthday": "Mon Aug 12 1985 00:00:00 GMT-0400 (EDT)",
        "sex": "male",
        "skills": {
            "MySQL": "true",
            "MongoDB": "true",
            "Nodejs": "true",
            "PHP": "true",
            "noSQL": "true",
            "SQL": "true",
            "Git": "true",
            "CSS": "true",
            "Foreign_Languages": "true",
            "Javascript": "true",
            "Linux": "true",
            "Data_Migration": "true",
            "Python": "true"
        },
        "interests": {
            "discover_passion": "true",
            "engineering_technology": "true",
            "finance_investment": "true",
            "intrapreneurship": "true",
            "learn": "true"
        },
        "experience": "5-10",
        "degree": "Masters",
        "commitment": "4-8h"
    },
    "collaborator": {
        "birthday": "Sat Feb 22 1986 00:00:00 GMT-0500 (EST)",
        "sex": "female",
        "skills": {
            "Distribution": "true",
            "Foreign_Languages": "true",
            "Apple": "true",
            "HTML": "true",
            "Javascript": "true",
            "PHP": "true",
            "Planning": "true",
            "Java": "true"
        },
        "interests": {
            "intrapreneurship": "true",
            "engineering_technology": "true",
            "do_it_yourself": "true",
            "discover_passion": "true",
            "business_collaborations": "true"
        },
        "experience": "5-10",
        "degree": "Bachelors",
        "commitment": "4-8h"
    },
    "score": 71,
    "astrological_score": 81,
    "result": {
        "astrologicalResponse": {
            "sign1": "leo",
            "sign2": "pisces",
            "score": "81",
            "title": "You Two are Solid... Solid as a Rock, Actually"
        },
        "astrologicalScore": 81,
        "collaborativeScore": 91,
        "finalScore": 86
    }
};

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

getCollaborativeScore(data, function(err, score){
    console.log("final score is:");
    console.log(score);
});