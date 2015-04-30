

var weCrypto = require('wechat-crypto');
var config = require('./config');
var template = require("./tmpl");
var parseXML = require('xml2js').parseString;
var raw = require('raw-body');





module.exports = wx = {


	signatrue: function(query, host){
		
		var signature = query.signature;
		var timestamp = query.timestamp;
		var nonce     = query.nonce;

		var cfg = config[host];

		var cryptor = new weCrypto(cfg.token, cfg.encodingAESKey, cfg.appid); 

		var token = "chain";
		var array = [token, timestamp, nonce].sort();

		var str = array.join('');

		var crypto = require('crypto');
		var shasum = crypto.createHash('sha1');

		shasum.update(str);

		str = String(shasum.digest('hex'));
		

		return str == signature ? true : false;

	},

	decrypt: function(text, host){
		var cfg = config[host],
			cryptor = new weCrypto(cfg.token, cfg.encodingAESKey, cfg.appid); 
		return cryptor.decrypt(text);
	},

	eecrypt: function(text, host){
		var cfg = config[host],
			cryptor = new weCrypto(cfg.token, cfg.encodingAESKey, cfg.appid); 
		return cryptor.eecrypt(text);
	},

	XML: function(text, done){

		parseXML(text, function(err, result) {
			if (err) throw err;
			done(null, result);
		});
	},

	coXML: function(text){

		return function(done){
			parseXML(text, function(err, result) {
				if (err) throw err;

				done(null, result);
			});
		};
	},

	coXMLO: function(text){

		return function(done){
			parseXML(text, function(err, result) {
				if (err) throw err;

				var data = {}, name, result = result.xml;

				for(name in result){
					data[name] = result[name].length == 1 ? result[name][0] : result[name];
				}
				
				done(null, data);
			});
		};
	},

	requestXML: function(req, opts){
		req = req.req || req;

		// Parse Content-Type
		var type = (req.headers['content-type'] || '').split(';')[0];
		if (type === 'text/xml') {
			return function(done) {
				raw(req, opts, function(err, str){
					if (err) return done(err);
					try {
						wx.XML(str, done);					
					} catch (err) {
						err.status = 400;
						err.body = str;
						done(err);
					}
				});
			};
		} else {
			return function(done) {
				var err = new Error('Unsupported or missing content-type');
				err.status = 415;
				done(err);
			};
		}
	},

	reply: function(type, body){

		return template[type](body);

	},

	basemessage: function(data){
		return {
			toUser: data.FromUserName, 
    		fromUser: data.ToUserName,
    		time: Date.now()
    	};
	}



};