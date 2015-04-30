
var http = require("https");
var querystring = require('querystring');

var options = {

	host: "api.weixin.qq.com",
	path: "",
	method: "POST",
	port: 443
};


module.exports = {

	get: function(url, callback){

		http.get(url, function(res){

			var data = "";
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on("end", function(){
				callback(JSON.parse(data));
			});
		});

	},
	post: function(path, data, callback){
		
		data = JSON.stringify(data);

		headers = {
			
		};

		options.headers = headers;
		options.path    = path;

		req = http.request(options, function(res) {

			res.setEncoding('utf-8');

			var responseString = '';

			res.on('data', function(data) {
				responseString += data;
			});

			res.on('end', function() {
				callback(JSON.parse(responseString));
			});

		});
		console.log(data);
		req.write(data);
		req.end();

	}


};


