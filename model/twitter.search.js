var client = require(__dirname+'/connection.twitter.js')
var Promise = require('promise')

var Twitter = function(){};

Twitter.prototype.search = function(opt){
 return new Promise(function(resolve,reject){
      client.stream('statuses/filter', {track: opt.query}, function(stream) {
        resolve(stream);
      })
 });
}

module.exports = new Twitter()