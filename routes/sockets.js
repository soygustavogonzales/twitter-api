var twitter = require('../model/twitter.search.js')
module.exports = function(socket){
		//console.log(socket)
		socket.on('search', function(opt){
			console.log(opt)
			twitter.search(opt)
			.then(function(stream){
					stream.on('data',function(tweet){
				   socket.emit('new_tweet',{list:opt.list,text:tweet.text});
					})
     stream.on('error', function(error) {
       console.log(error);
     });
			})

		})

}