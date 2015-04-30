
var H = require("./http"), config = require("./config");


var access_token = "";
var API = {
	token: "",
	serverip: "cgi-bin/getcallbackip?access_token=",
	createmenu: "cgi-bin/menu/create?access_token=",

	material: "cgi-bin/material/batchget_material?access_token=",
	getarticlesummary: "datacube/getarticletotal?access_token="

};

var util = require('util');
var exec = require('child_process').exec;

for(var host in config){
	API.token = "cgi-bin/token?grant_type=client_credential&appid="+config[host].appid 
	          + "&secret=" + config[host].secret;
}

for(var url in API){
	API[url] = "https://api.weixin.qq.com/"+API[url];
}

var menu = {

	button: [{
		name: '快速看',
		sub_button:[
			{
				type: 'click',
				name: '最新文章',
				key:  'newarticle'
			},
			{
				type: 'click',
				name: '本周热门',
				key:  'hot'
			},
			{
				type: 'click',
				name: '随便来点',
				key:  'random'
			}
		]
	},
	{
		type: 'view',
		name: '资讯',
		url:  'http://m.cocoachina.com'
	},
	{
		type: 'view',
		name: '论坛',
		url:  'http://www.cocoachina.com/bbs/3g/'
	}]
};

var Sync = {

	access_token: "",

	token: function(){
		
		return function(done){
			H.get(API.token, function(data){
				Sync.access_token = data.access_token;
				done(null, data);
			});
		}
	},

	serverip: function(){
		H.get(API.serverip+Sync.access_token, function(data){
			Sync.ip_list = data.ip_list;
		});
	},

	get: H.get,

	createmenu: function(){
		H.post(API.createmenu + Sync.access_token, menu, function(data){
			console.log(data);
		});
	},

	material: function(offset){

		return function(done){
			H.post(API.material + Sync.access_token, {
				type: "news",
				offset: offset,
				count: 20
			}, function(data){
				done(null, data);
			});
		}

		
	},

	saveFile: function(mediaid){

    	var command = 'curl "https://api.weixin.qq.com/cgi-bin/material/get_material?access_token="'
    				+ Sync.access_token + ' -d \'{"media_id":"'+ mediaid
    				+ '"}\' > '+__dirname+'/images/'+ mediaid+".jpg";

        child = exec(command, function(error, stdout, stderr){});
	},


	getarticlesummary: function(range){
		var date = {
		    "begin_date": range, 
		    "end_date": range
		};

		return function(done){
			H.post(API.getarticlesummary + Sync.access_token, date, function(data){
				done(null, data);
			});
		}
	}


};

Sync.token();


module.exports = Sync;