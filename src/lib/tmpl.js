

var Handlebars = require("handlebars");

var T = {

text: '\
	<xml>\
		<ToUserName><![CDATA[{{toUser}}]]></ToUserName>\
		<FromUserName><![CDATA[{{fromUser}}]]></FromUserName>\
		<CreateTime>{{time}}</CreateTime>\
		<MsgType><![CDATA[text]]></MsgType>\
		<Content><![CDATA[{{message}}]]></Content>\
	</xml>',

image: '\
<xml>\
	<ToUserName><![CDATA[{{toUser}}]]></ToUserName>\
	<FromUserName><![CDATA[{{fromUser}}]]></FromUserName>\
	<CreateTime>{{time}}</CreateTime>\
	<MsgType><![CDATA[image]]></MsgType>\
	<Image>\
	<MediaId><![CDATA[{{mediaid}}]]></MediaId>\
	</Image>\
</xml>',

voice: '\
<xml>\
	<ToUserName><![CDATA[{{toUser}}]]></ToUserName>\
	<FromUserName><![CDATA[{{fromUser}}]]></FromUserName>\
	<CreateTime>{{time}}</CreateTime>\
	<MsgType><![CDATA[voice]]></MsgType>\
	<Voice>\
	<MediaId><![CDATA[{{mediaid}}]]></MediaId>\
	</Voice>\
</xml>',

video: '\
<xml>\
	<ToUserName><![CDATA[{{toUser}}]]></ToUserName>\
	<FromUserName><![CDATA[{{fromUser}}]]></FromUserName>\
	<CreateTime>{{time}}</CreateTime>\
	<MsgType><![CDATA[video]]></MsgType>\
	<Video>\
	<MediaId><![CDATA[{{mediaid}}]]></MediaId>\
	<Title><![CDATA[{{title}}]]></Title>\
	<Description><![CDATA[{{description}}]]></Description>\
	</Video>\
</xml>',

music: '\
<xml>\
	<ToUserName><![CDATA[{{toUser}}]]></ToUserName>\
	<FromUserName><![CDATA[{{fromUser}}]]></FromUserName>\
	<CreateTime>{{time}}</CreateTime>\
	<MsgType><![CDATA[music]]></MsgType>\
	<Music>\
	<Title><![CDATA[{{title}}]]></Title>\
	<Description><![CDATA[{{description}}]]></Description>\
	<MusicUrl><![CDATA[{{musicurl}}]]></MusicUrl>\
	<HQMusicUrl><![CDATA[{{hqmusicurl}}]]></HQMusicUrl>\
	<ThumbMediaId><![CDATA[{{mediaid}}]]></ThumbMediaId>\
	</Music>\
</xml>',

news: '\
<xml>\
	<ToUserName><![CDATA[{{toUser}}]]></ToUserName>\
	<FromUserName><![CDATA[{{fromUser}}]]></FromUserName>\
	<CreateTime>{{time}}</CreateTime>\
	<MsgType><![CDATA[news]]></MsgType>\
	<ArticleCount>{{count}}</ArticleCount>\
	<Articles>\
		{{#each articles}}\
		<item>\
		<Title><![CDATA[{{Title}}]]></Title> \
		<Description><![CDATA[{{Description}}]]></Description>\
		<PicUrl><![CDATA[{{PicUrl}}]]></PicUrl>\
		<Url><![CDATA[{{Url}}]]></Url>\
		</item>\
		{{/each}}\
	</Articles>\
</xml> '


	


};










for(var n in T){
	T[n] = Handlebars.compile(T[n]);
}


module.exports = T;
