'use strict';



var koa = require('koa');
var app = module.exports = koa();
var mount  = require("koa-mount");
var ksort = require('ksort');
var staticserver = require("koa-static");

var Router = require('koa-router'),
    k = require("kmodel");

k.connect("mongodb://127.0.0.1:27017/cocoachinaweixin",__dirname+"/models/");


var route = new Router();

var wx = require("./lib/wx"),
    Message = k.load("Message");


var Rank = k.load("Rank"), News = k.load("News");
var start = require("./lib/time");


route.get("/",function *(){

    var query = this.query; 

    this.body = wx.signatrue(query, this.host) ? query.echostr : "";
});

var alldata = [], time = Date.now(), allnews = [];

route.post("/", function *(next){

    var verify = wx.signatrue(this.query, this.host), message = {}, result,
        body, xmlstr, me = this, data,  basemessage ;

    if(verify == false) return this.throw(403, 'error token');;

    body   = yield wx.requestXML(this.request.req);
    
    xmlstr = wx.decrypt(body.xml.Encrypt[0], this.host);
    
    data = yield wx.coXMLO(xmlstr.message);

    message.host = this.host;
    message.type = data.MsgType;
    message.openid = data.FromUserName;
    message.msg = data;

    var msg = yield Message.insertOne(message), news ;

    basemessage = wx.basemessage(data);

    if(Date.now() - time > 60 * 1000 * 30 || allnews.length == 0){

        allnews = yield News.find({});
    }


    var  ranges = start();

    if(data.Event == "CLICK"){


        if(data.EventKey == "newarticle"){

            basemessage.articles = allnews.slice(-10);
        }

        if(data.EventKey == "random"){

            basemessage.articles = randomArray(allnews);;
        }

        if(data.EventKey == "hot"){
            
            var datas = [], rst, news, newss = [];

            for(var i =0; i< ranges.length; i++){

                rst = yield Rank.find({ref_date: ranges[i]});
                datas = datas.concat(rst);
            }

            datas = sort(datas).slice(-20);

            for(var i =datas.length-1; i > 0 ; i--){

                news = yield News.find({Title: datas[i].title});
                newss = newss.concat(news);
            }

            basemessage.articles = newss.slice(0,10);
        }

    }

    basemessage.count = 10;
    basemessage.articles = basemessage.articles.map(function(item){
        item.PicUrl = "http://images.uuzcloud.com/"+ item.PicUrl; 
        return item; 
    });

    this.body = wx.reply("news", basemessage);;

});

app.use(staticserver(__dirname+'/lib/'));
app.use(mount("/", route.middleware()));
app.listen(5888);



function sort(array){

    ksort(array, function(a, b){ return parseInt(a.int_page_read_count) > parseInt(b.int_page_read_count);})
    return array;
}

function randomArray(array){

    var randomarrays = [], i = array.length < 20? array.length : 20, result = [];


    function random(){

        var r = Math.floor(array.length * Math.random());
        return randomarrays.indexOf(r) < 0 ? r : random();
    }

    while(i-->0){
        rnumber = random();
        randomarrays.push(rnumber);
        result.push(array[rnumber]);
    }

    return result.slice(-10);
}
