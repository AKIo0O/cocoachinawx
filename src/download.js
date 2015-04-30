
'use strict';

var co = require("co");

var k = require("kmodel").connect("mongodb://127.0.0.1:27017/cocoachinaweixin",__dirname+"/models/"), 
    Sync = require("./lib/sync");

var News = k.load("News");


// 同步所有图文消息
var Download = function*(){

    var list = [], item;

    list = yield News.find({});

    console.log("---图文下载开始---");

    while(list.length){  

        item = list.shift();

        yield Sync.saveFile(item.thumb_media_id);

        console.log(item.thumb_media_id + ".jpg is downloaded");
    }

    console.log("---图文下载完毕---");

};


co(Download);



